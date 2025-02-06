import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: it's automatically loaded
    url: process.env.DB_URL!,
  },
  schema: "./src/schema.ts",
});
