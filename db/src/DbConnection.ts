import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from './schema';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import postgres from 'postgres';

export class DbConnection {
  private static INSTANCE: PostgresJsDatabase<typeof schema>;

  static instance(): PostgresJsDatabase<typeof schema> {
    if (!DbConnection.INSTANCE) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const connectionString = `${process.env.DIRECT_URL}`;
      const client = postgres(connectionString);
      DbConnection.INSTANCE = drizzle(client, { schema });
    }
    return DbConnection.INSTANCE;
  }
}
