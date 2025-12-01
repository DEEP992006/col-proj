import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const knowledgeTable = pgTable("knowledge", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email:varchar().notNull(),
  name: varchar({ length: 255 }).notNull(),
  img: varchar().notNull(),
  desc: varchar().notNull(),
});