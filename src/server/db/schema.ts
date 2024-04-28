// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `pocket-owl_${name}`);

export const tasks = createTable(
  "task",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    userId: varchar("userId", { length: 256 }).notNull(),

    taskImageUrl: varchar("taskImageUrl", { length: 1024 }),
    taskImageId: varchar("taskImageId", { length: 1024 }),

    subTasks: varchar("subTasks", { length: 256 }),
    links: varchar("links", { length: 256 }),

    startDate: timestamp("startDate")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    
    endDate: timestamp("endDate")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),

    taskStatus: varchar("taskStatus", { length: 256 })
      .default("PENDING")
      .notNull(),

    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
    tags: varchar("tags", { length: 1024 }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const images = createTable(
  "image",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    url: varchar("url", { length: 1024 }).notNull(),
    userId: varchar("userId", { length: 1024 }).notNull(),
    taskId: varchar("taskId", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (example) => ({
    nameIndex: index("image_idx").on(example.name),
  }),
);
