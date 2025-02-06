import { issuer } from "@openauthjs/openauth";
import { RedisStorage } from "./redis";
import { subjects } from "./subjects";
import { env } from "~/env";
import { DiscordProvider } from "@openauthjs/openauth/provider/discord";
import { Select } from "@openauthjs/openauth/ui/select";
import { THEME_TERMINAL } from "@openauthjs/openauth/ui/theme";
import * as v from "valibot";
import { db, users } from "~/db";
import { eq } from "drizzle-orm";
import { createValibotFetcher } from "~/valibot-fetcher";

const valiFetch = createValibotFetcher();

async function getDiscordUser(accessToken: string) {
  const res = await valiFetch(
    v.object({
      id: v.string(),
      username: v.string(),
      avatar: v.string(),
      email: v.string(),
    }),
    "https://discord.com/api/users/@me",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const user = await db.query.users.findFirst({
    where: eq(users.email, res.email),
  });

  if (!user) {
    const newUser = await db
      .insert(users)
      .values({
        username: res.username,
        image: res.avatar,
        email: res.email,
      })
      .returning();
    return newUser[0];
  }

  return user;
}

export default issuer({
  theme: {
    ...THEME_TERMINAL,
    title: "gurkan's passport",
    logo: {
      light:
        "https://gist.github.com/thatgurkangurk/c10dcf3cf38dbcdd9859c7fcb710d6bc/raw/9b3039855c4fe8533429ead44230d7b3c4c53e67/dark.svg",
      dark: "https://gist.github.com/thatgurkangurk/c10dcf3cf38dbcdd9859c7fcb710d6bc/raw/9b3039855c4fe8533429ead44230d7b3c4c53e67/light.svg",
    },
    favicon: "",
  },
  select: Select({
    providers: {
      discord: {
        display: "Discord",
      },
    },
  }),
  subjects,
  storage: RedisStorage({
    connectionUrl: env.REDIS_URL,
  }),
  providers: {
    discord: DiscordProvider({
      clientID: env.DISCORD_ID,
      clientSecret: env.DISCORD_SECRET,
      scopes: ["identify", "email"],
    }),
  },
  allow: async (input) => {
    if (env.NODE_ENV === "development") return true;
    const url = new URL(input.redirectURI);
    const { hostname } = url;
    if (hostname.endsWith("gurkz.me")) return true;
    if (hostname === "localhost") return true;
    return false;
  },
  success: async (ctx, value) => {
    if (value.provider === "discord") {
      const user = await getDiscordUser(value.tokenset.access);

      return ctx.subject("user", user);
    }

    throw new Error("unsupported provider");
  },
});
