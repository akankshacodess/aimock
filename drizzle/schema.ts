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
