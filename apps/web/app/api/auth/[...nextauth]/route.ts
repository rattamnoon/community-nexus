import { axiosInstance } from '@/utils/axiosInstance';
import dayjs from 'dayjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Please enter username and password');
        }

        const response = await axiosInstance.post('/auth/signin', {
          username: credentials.username,
          password: credentials.password,
        });

        if (response.status !== 200) {
          throw new Error('Invalid username or password');
        }

        return {
          accessToken: response.data.token,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn,
          id: response.data.user.id,
          username: response.data.user.username,
        };
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-in',
    error: '/sign-in',
    newUser: '/sign-up',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.accessToken) {
        const expiresIn = user.expiresIn;
        const refreshToken = user.refreshToken;

        if (expiresIn && expiresIn < dayjs().unix()) {
          const response = await axiosInstance.post('/auth/refresh', {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          token.accessToken = response.data.token;
          token.refreshToken = response.data.refreshToken;
          token.expiresIn = response.data.expiresIn;
          token.id = response.data.user.id;
          token.username = response.data.user.username;

          return token;
        }

        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresIn = user.expiresIn;
        token.id = user.id;
        token.username = user.username;

        return token;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresIn = token.expiresIn;
      session.user.id = token.id;
      session.user.username = token.username;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
