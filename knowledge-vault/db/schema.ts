import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const knowledgeTable = pgTable("knowledge", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  img: varchar().notNull(),
  desc: varchar().notNull(),
});