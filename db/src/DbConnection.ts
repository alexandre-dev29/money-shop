import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import postgres from 'postgres';
import { Pool } from 'pg';

export class DbConnection {
  private static INSTANCE: NodePgDatabase<typeof schema>;

  static instance(): NodePgDatabase<typeof schema> {
    if (!DbConnection.INSTANCE) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const connectionString = `${process.env.DATABASE_URL}`;
      const pool = new Pool({ connectionString });
      // const client = postgres(connectionString);
      DbConnection.INSTANCE = drizzle(pool, { schema });
    }
    return DbConnection.INSTANCE;
  }
}
