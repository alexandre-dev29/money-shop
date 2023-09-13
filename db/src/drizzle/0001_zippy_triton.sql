DO $$ BEGIN
 CREATE TYPE "devise" AS ENUM('CDF', 'USD');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "genre_transation" AS ENUM('Equity', 'Airtel', 'Vodacom', 'Africell', 'Orange', 'MainAccount');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('Admin', 'Manager', 'User');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "type_transaction" AS ENUM('Depot', 'Retrait', 'Approvisionement');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shop" (
	"id" uuid PRIMARY KEY NOT NULL,
	"shop_name" text NOT NULL,
	"shop_informations" text NOT NULL,
	"createAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"role" "role" DEFAULT 'User' NOT NULL,
	"shopid" uuid NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "shop_shop_name_key" ON "shop" ("shop_name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_shopid_shop_id_fk" FOREIGN KEY ("shopid") REFERENCES "shop"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
