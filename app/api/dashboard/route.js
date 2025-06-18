import { getAuth } from "@clerk/nextjs/server";
import { db } from "../../../utils/db";
import { MockInterview, UserAnswer, User } from "../../../utils/schema";
import { eq, desc, inArray } from "drizzle-orm";

export async function GET(request) {
  try {
    // Use Clerk's getAuth to get the user
    const auth = getAuth(request);
    const userId = auth.userId;
    // Clerk v6+ getAuth does not return user object directly, so fetch email from claims
    // For Session JWT V2, email is in the claims object
    const email = (auth.sessionClaims?.email || (auth.sessionClaims?.primaryEmailAddress && auth.sessionClaims.primaryEmailAddress.emailAddress) || "").toLowerCase().trim();

    if (!userId || !email) {
      console.error("No email found in Clerk session claims", auth.sessionClaims);
      return new Response("Unauthorized", { status: 401 });
    }

    // 5. Fetch user row and interviewIds
    const userRow = await db.select().from(User).where(eq(User.email, email));
    let interviewIds = [];
    if (userRow && userRow.length > 0) {
      try {
        interviewIds = JSON.parse(userRow[0].interviewIds || "[]");
      } catch {
        interviewIds = [];
      }
    }
    console.log('Dashboard API: interviewIds for user', email, interviewIds);

    let interviews = [];
    if (interviewIds.length > 0) {
      interviews = await db.select().from(MockInterview).where(inArray(MockInterview.mockId, interviewIds)).orderBy(desc(MockInterview.id));
    }
    console.log('Dashboard API: interviews fetched', interviews.length);

    const answers = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.userEmail, email));

    const total = interviews.length;
    const ratings = answers.map(a => Number(a.rating) || 0);
    let avgScore = 0;
    if (ratings.length) {
      avgScore = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      avgScore = Math.min(avgScore, 5); // Clamp to 5 max
      avgScore = avgScore.toFixed(1);
    }
    const practiceTime = (total * 0.5).toFixed(1);
    const successRate = ratings.length
      ? ((ratings.filter(r => r >= 4).length / ratings.length) * 100).toFixed(0) + "%"
      : "0%";

    const achievements = [
      { title: "First Interview", unlocked: total >= 1 },
      { title: "5 Interviews", unlocked: total >= 5 },
      { title: "Perfect Score", unlocked: ratings.includes(5) },
      { title: "10 Hours Practice", unlocked: practiceTime >= 10 },
    ];

    return Response.json({
      stats: { total, avgScore, practiceTime, successRate },
      interviews,
      achievements,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
