import { pgTable, text, timestamp, boolean, varchar } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const comments = pgTable('comments', {
  id: varchar('id', { length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),
  postId: varchar('post_id', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }),
  content: text('content').notNull(),
  parentId: varchar('parent_id', { length: 128 }),
  approved: boolean('approved').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
