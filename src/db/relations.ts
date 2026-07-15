import { relations } from "drizzle-orm";
import { users, watchlists } from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  watchlists: many(watchlists),
}));

export const watchlistsRelations = relations(
  watchlists,
  ({ one }) => ({
    user: one(users, {
      fields: [watchlists.userId],
      references: [users.id],
    }),
  })
);