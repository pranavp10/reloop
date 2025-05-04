ALTER TABLE "apikey" ADD COLUMN "organization_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "active_mode" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "active_organization" text;--> statement-breakpoint
ALTER TABLE "apikey" ADD CONSTRAINT "apikey_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;