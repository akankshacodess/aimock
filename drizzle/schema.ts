import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

// User table with interviewIds as a JSON/text array
export const user = pgTable("user", {
    id: serial("id").primaryKey(),
    email: varchar("email").notNull().unique(),
    interviewIds: text("interviewIds").default("[]"), // Store as JSON string
});

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

export const userAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question ").notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
  });
