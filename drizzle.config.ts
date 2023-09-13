import type { Config } from "drizzle-kit";

export default {
    schema: "./db/src/schema.ts",
    out: "./db/src/drizzle",
    driver: 'pg',
    dbCredentials: {
        connectionString: `${process.env.DIRECT_URL}`,
    }
} satisfies Config;