<<<<<<< HEAD
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
=======
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"
>>>>>>> 9c6a4b3330daff54b71350e3dccf2553a37c12f9

export const mockInterview = pgTable("mockInterview", {
    id: serial("id").primaryKey(),
    jsonMockResp: text("jsonMockResp").notNull(),
    jobPosition: varchar("jobPosition").notNull(),
    jobDesc: varchar("jobDesc").notNull(),
    jobExperience: varchar("jobExperience").notNull(),
    createdBy: varchar("createdBy"),
    createdAt: varchar("createdAt"),
    mockId: varchar("mockId").notNull(),
});

<<<<<<< HEAD
export const userAnswer = pgTable("userAnswer", {
    id: serial("id").primaryKey(),
    mockIdRef: varchar("mockIdRef").notNull(),
    question: varchar("question").notNull(),
    correctAns: text("correctAns"),
    userAns: text("userAns"),
    feedback: text("feedback"),
    rating: varchar("rating"),
    userEmail: varchar("userEmail"),
    createdAt: varchar("createdAt"),
});
=======
// export const userAnswer = pgTable("userAnswer", {
// 	id: serial("id").primaryKey(),
// 	mockIdRef: varchar("mockId").notNull(),
// 	question: varchar("question ").notNull(),
// 	correctAns: text("correctAns"),
// 	userAns: text("userAns"),
// 	feedback: text("feedback"),
// 	rating: varchar("rating"),
// 	userEmail: varchar("userEmail"),
// 	createdAt: varchar("createdAt"),
//   });
>>>>>>> 9c6a4b3330daff54b71350e3dccf2553a37c12f9
