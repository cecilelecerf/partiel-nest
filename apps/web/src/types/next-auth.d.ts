import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: number;
      role: string;
      email: string;
      name?: string;
    };
  }
  interface User {
    id: number;
    accessToken: string;
    refreshToken: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    id: number;
    role: string;
  }
}
