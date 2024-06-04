// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
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

export const buckets = createTable(
  "bucket",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    userId: varchar("userId", { length: 256 }).notNull(),
  },
  (example) => ({
    nameIndex: index("bucket_idx").on(example.name),
  }),
)
export type Bucket = typeof buckets.$inferSelect;


export const boards = createTable(
  "board",
  {
    id:               serial("id").primaryKey(),
    userId:           varchar("userId", { length: 256 }).notNull(),
    name:             varchar("name", { length: 256 }).notNull(),
    imageId:          varchar("imageId", { length: 256 }),
    imageThumbUrl:    varchar("imageThumbUrl", { length: 1024 }),
    imageFullUrl:     varchar("imageFullUrl", { length: 1024 }),
    imageUserName:    varchar("imageUserName", { length: 256 }),
    imageLinkHTML:    varchar("imageLinkHTML", { length: 1024 }),

    createdAt:        timestamp("createdAt")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt:        timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("board_idx").on(example.name),
  }),
);
export const boardRelations = relations(boards, ({ many }) => ({
  lists: many(lists),
}))
export type Board = typeof boards.$inferSelect;

export const lists = createTable(
  "list",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    order: integer("order").notNull(),
    status: varchar("status", { length: 256 }),
    boardId: serial("boardId")
      .references(() => boards.id, { onDelete: "cascade" })
      .notNull(),
  },
  (example) => ({
    nameIndex: index("list_idx").on(example.name),
    boardIdIndex: index("boardId_idx").on(example.boardId),
  }),
);
export const listRelations = relations(lists, ({ one, many }) => ({
  board: one(boards, {
    fields: [lists.boardId],
    references: [boards.id],
  }),
  cards: many(cards),
}));
export type List = typeof lists.$inferSelect; 

export const cards = createTable(
  "card",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    order: integer("order").notNull(),
    completed: boolean("completed").default(false),
    status: varchar("status", { length: 256 }),
    description: varchar("description", { length: 1024 }),
    tags: varchar("tags", { length: 1024 }),

    subtasks: varchar("subtasks", { length: 1024 }),
    subtaskStatuses: varchar("subtaskStatuses", { length: 256 }),

    attachments: varchar("attachments", { length: 2048 }),

    listId: serial("listId")
      .references(() => lists.id, { onDelete: "cascade" })
      .notNull(),

    startDate: timestamp("startDate")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    
    updatedAt: timestamp("updatedAt")
      .default(sql`CURRENT_TIMESTAMP`),

    endDate: timestamp("endDate")
      .default(sql`CURRENT_TIMESTAMP`),
  },  (example) => ({
    nameIndex: index("card_idx").on(example.name),
    listIdIndex: index("listId_idx").on(example.listId),
  }),
);
export const cardRelations = relations(cards, ({ one,}) => ({
  list: one(lists, {
    fields: [cards.listId],
    references: [lists.id],
  }),
}));
export type Card = typeof cards.$inferSelect;
