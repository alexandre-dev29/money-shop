CREATE TABLE IF NOT EXISTS "account" (
	"phonenumber" varchar PRIMARY KEY NOT NULL,
	"agentcode" text NOT NULL,
	"agentname" text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "account_agentcode_key" ON "account" ("agentcode");