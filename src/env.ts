import { createEnv } from "@t3-oss/env-core";
import * as v from "valibot";

const nodeEnvValues = ["development", "production"] as const;

export const env = createEnv({
  server: {
    DB_URL: v.string(),
    REDIS_URL: v.string(),
    DISCORD_ID: v.string(),
    DISCORD_SECRET: v.string(),
    NODE_ENV: v.optional(v.picklist(nodeEnvValues), "development"),
  },

  clientPrefix: "PUBLIC_",

  client: {},
  runtimeEnv: Bun.env,

  emptyStringAsUndefined: true,
});

export type EnvVariables = typeof env;
