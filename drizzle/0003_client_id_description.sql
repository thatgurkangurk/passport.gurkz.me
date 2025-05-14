ALTER TABLE "client_id" ALTER COLUMN "client_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "client_id" ADD COLUMN "description" text;