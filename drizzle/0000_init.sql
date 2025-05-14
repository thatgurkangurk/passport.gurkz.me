CREATE TYPE "public"."oauth_provider" AS ENUM('discord');--> statement-breakpoint
CREATE TABLE "account" (
	"userId" text NOT NULL,
	"provider" "oauth_provider" NOT NULL,
	"provider_account_id" text NOT NULL,
	CONSTRAINT "compoundKey" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"isAdmin" boolean DEFAULT false NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;