import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { AuthOptions } from 'next-auth';
import { DbConnection, users } from 'db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phoneNumber: {
          label: 'PhoneNumber',
          type: 'text',
          placeholder: 'Phone number',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const database = DbConnection.instance();
        const currentUser = await database.query.users.findFirst({
          where: eq(users.phoneNumber, `${credentials?.phoneNumber}`),
        });

        if (
          currentUser &&
          (await bcrypt.compare(
            `${credentials?.password}`,
            currentUser.password,
          ))
        ) {
          return {
            id: currentUser.id,
            name: currentUser.fullName,
            image: JSON.stringify({ ...currentUser, password: '' }),
          };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: '/login' },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
