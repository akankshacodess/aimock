import { getAuth } from "@clerk/nextjs/server";
import { db } from "../../../../utils/db";
import { MockInterview, User } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    const auth = getAuth(request);
    const userId = auth.userId;
    const email = auth.sessionClaims?.email || (auth.sessionClaims?.primaryEmailAddress && auth.sessionClaims.primaryEmailAddress.emailAddress);
    if (!userId || !email) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const { jobPosition, jobDesc, jobExperience, jsonMockResp } = body;
    if (!jobPosition || !jobDesc || !jobExperience || !jsonMockResp) {
      return new Response("Missing fields", { status: 400 });
    }
    const mockId = uuidv4();
    await db.insert(MockInterview).values({
      mockId,
      jsonMockResp,
      jobPosition,
      jobDesc,
      jobExperience,
      createdBy: email,
      createdAt: new Date().toISOString(),
    });
    // Update or create user row
    let cleanEmail = (email || "").toLowerCase().trim();
    console.log('Using email for DB ops:', cleanEmail);
    let userRow = await db.select().from(User).where(eq(User.email, cleanEmail));
    if (!userRow || userRow.length === 0) {
      const insertResult = await db.insert(User).values({
        email: cleanEmail,
        interviewIds: JSON.stringify([mockId]),
      });
      console.log('Insert result:', insertResult);
      console.log('Created new user row with interviewIds:', [mockId]);
    } else {
      let interviewIds = [];
      try {
        interviewIds = JSON.parse(userRow[0].interviewIds || "[]");
      } catch {
        interviewIds = [];
      }
      if (!interviewIds.includes(mockId)) {
        interviewIds.push(mockId);
        const updateResult = await db.update(User)
          .set({ interviewIds: JSON.stringify(interviewIds) })
          .where(eq(User.email, cleanEmail));
        console.log('Update result:', updateResult);
        console.log('Updated user row interviewIds:', interviewIds);
      } else {
        console.log('mockId already present in interviewIds:', interviewIds);
      }
    }
    // Fetch and log user row after update/insert
    const userRowAfter = await db.select().from(User).where(eq(User.email, cleanEmail));
    console.log('User row after update/insert:', userRowAfter);
    return Response.json({ mockId });
  } catch (error) {
    console.error("Interview creation error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
