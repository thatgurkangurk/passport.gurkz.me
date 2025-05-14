import {
  boolean,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import * as v from "valibot";
import { relations } from "drizzle-orm";

export const providerEnum = pgEnum("oauth_provider", ["discord"]);

export const users = pgTable("user", {
  id: varchar({
    length: 21,
  })
    .$defaultFn(() => nanoid(21))
    .primaryKey(),
  username: text().notNull().unique(),
  isAdmin: boolean().notNull().default(false),
});

export const accounts = pgTable(
  "account",
  {
    userId: text()
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    provider: providerEnum().notNull(),
    providerAccountId: text("provider_account_id").notNull(),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
      name: "compoundKey",
    }),
  ]
);

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const valibotUser = v.object({
  id: v.string(),
  username: v.string(),
});

export const clientIds = pgTable("client_id", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").defaultRandom(),
  userId: varchar()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  description: text("description"),
});

export const clientIdRelations = relations(clientIds, ({ one }) => ({
  user: one(users, {
    fields: [clientIds.userId],
    references: [users.id],
  }),
}));

const schema = {
  users: users,
  accounts: accounts,
  accountRelations: accountRelations,
  clientIds: clientIds,
};
