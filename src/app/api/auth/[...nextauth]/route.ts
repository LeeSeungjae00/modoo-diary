import { postSignIn, reissue } from "@/api/auth";
import { AccessTokenPayload } from "@/types/auth";
import jwtDecode from "jwt-decode";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "id-pw-credential",
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { type: "text" },
        password: { label: "Password" },
      },
      async authorize(credentials, _req) {
        try {
          if (!credentials) {
            return null;
          }

          const { data } = await postSignIn({
            loginId: credentials.username,
            password: credentials.password,
          });
          
          if (data.accessToken && data.refreshToken) {
            const user = jwtDecode<AccessTokenPayload>(data.accessToken);
            return {
              id: user.sub,
              name: user.nickName,
              role: user.role,
              accessToken_exp: user.exp,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            };
          }
          return null;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (
        token.accessToken_exp &&
        (token.accessToken_exp as number) < Date.now() / 1000
      ) {
        const { data } = await reissue(token.accessToken as string, token.refreshToken as string);
        console.log("token refresh");
        const decode = jwtDecode<AccessTokenPayload>(data.accessToken);
        return {
          ...token,
          ...data,
          exp: decode.exp,
        };
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };
