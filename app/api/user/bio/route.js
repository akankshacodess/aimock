import { getAuth } from "@clerk/nextjs/server";
import { db } from "../../../../utils/db";
import { User } from "../../../../utils/schema";
import { eq } from "drizzle-orm";

export async function PATCH(request) {
  try {
    const auth = getAuth(request);
    const email = (auth.sessionClaims?.email || (auth.sessionClaims?.primaryEmailAddress && auth.sessionClaims.primaryEmailAddress.emailAddress) || "").toLowerCase().trim();
    if (!email) return new Response("Unauthorized", { status: 401 });
    const { bio } = await request.json();
    await db.update(User).set({ bio }).where(eq(User.email, email));
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error updating bio:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET(request) {
  try {
    const auth = getAuth(request);
    const email = (auth.sessionClaims?.email || (auth.sessionClaims?.primaryEmailAddress && auth.sessionClaims.primaryEmailAddress.emailAddress) || "").toLowerCase().trim();
    if (!email) return new Response("Unauthorized", { status: 401 });
    const userRow = await db.select().from(User).where(eq(User.email, email));
    const bio = userRow[0]?.bio || "";
    return Response.json({ bio });
  } catch (error) {
    console.error("Error fetching bio:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
