import { drizzle, type BunSQLDatabase } from "drizzle-orm/bun-sql";
import { env } from "./env";
import * as schema from "./schema";

export const db = drizzle(env.DB_URL, { schema: schema });

export type Database = BunSQLDatabase<typeof schema>;
