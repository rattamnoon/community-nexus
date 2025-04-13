import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    id: string;
    username: string;
  }
  interface Session {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    error?: string;
    user: {
      id: string;
      username: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    id: string;
    username: string;
    error?: string;
  }
}
