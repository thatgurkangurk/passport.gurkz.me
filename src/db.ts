import { drizzle, type BunSQLDatabase } from "drizzle-orm/bun-sql";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { env } from "./env";
import * as v from "valibot";

export const users = pgTable("user", {
  id: varchar({
    length: 21,
  })
    .$defaultFn(() => nanoid(21))
    .primaryKey(),
  username: text().notNull(),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const valibotUser = v.object({
  id: v.string(),
});

const schema = {
  users: users,
};

export const db = drizzle(env.DB_URL, { schema: schema });

export type Database = BunSQLDatabase<typeof schema>;
