import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
        id: number,
        name: string,
        role: string,
        accessToken_exp : number,
        accessToken: string,
        refreshToken : string,
    };
  }
}

