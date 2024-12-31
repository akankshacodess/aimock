import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const mockInterview = pgTable("mockInterview", {
	id: serial().primaryKey().notNull(),
	jsonMockResp: text().notNull(),
	jobPosition: varchar().notNull(),
	jobDesc: varchar().notNull(),
	jobExperience: varchar().notNull(),
	createdBy: varchar(),
	createdAt: varchar(),
	mockId: varchar().notNull(),
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