import { drizzle, type BunSQLDatabase } from "drizzle-orm/bun-sql";
import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { env } from "./env";
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

const schema = {
  users: users,
  accounts: accounts,
  accountRelations: accountRelations,
};

export const db = drizzle(env.DB_URL, { schema: schema });

export type Database = BunSQLDatabase<typeof schema>;
