import { defineConfig } from "drizzle-kit";
import { env } from "~/env";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: env.DB_URL,
  },
  schema: "./src/db.ts",
});
