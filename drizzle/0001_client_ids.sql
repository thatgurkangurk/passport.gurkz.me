CREATE TABLE "client_id" (
	"id" uuid PRIMARY KEY NOT NULL,
	"client_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"userId" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "client_id" ADD CONSTRAINT "client_id_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;