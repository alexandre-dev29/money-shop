CREATE TABLE IF NOT EXISTS "sub_account" (
	"id" uuid PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"devise" "devise" NOT NULL,
	"amount" double precision NOT NULL,
	"account_number" varchar NOT NULL,
	"transation_genre" "genre_transation" DEFAULT 'Airtel' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction" (
	"id" uuid PRIMARY KEY NOT NULL,
	"transation_type" "type_transaction" NOT NULL,
	"amount" double precision NOT NULL,
	"numero_reference" text NOT NULL,
	"identityPiece" text NOT NULL,
	"phoneNumber" text NOT NULL,
	"clientName" text NOT NULL,
	"user_id" uuid NOT NULL,
	"createAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"sub_account_id" uuid NOT NULL,
	"amount_before" double precision NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "account_number" varchar NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_account_number_account_phonenumber_fk" FOREIGN KEY ("account_number") REFERENCES "account"("phonenumber") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sub_account" ADD CONSTRAINT "sub_account_account_number_account_phonenumber_fk" FOREIGN KEY ("account_number") REFERENCES "account"("phonenumber") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_sub_account_id_sub_account_id_fk" FOREIGN KEY ("sub_account_id") REFERENCES "sub_account"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
