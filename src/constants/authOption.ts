import { checkAuthCode, postSignIn, reissue } from "@/api/auth";
import { AccessTokenPayload } from "@/types/auth";
import jwtDecode from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "naver-credential",
      name: "naver-credential",
      type: "credentials",
      credentials: {
        code: { type: "text" },
      },
      async authorize(credentials, _req) {
        try {
          if (!credentials) {
            return null;
          }

          const res = await checkAuthCode(credentials.code);

          console.log(res);

          if (res.data.accessToken && res.data.refreshToken) {
            const user = jwtDecode<AccessTokenPayload>(res.data.accessToken);
            return {
              id: user.sub,
              name: user.nickName,
              role: user.role,
              accessToken_exp: user.exp,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            };
          }
          return null;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
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
          console.log("test");
          console.error(e);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "token-reissue-credential",
      name: "Credentials",
      type: "credentials",
      credentials: {
        accessToken: { type: "text" },
        refreshToken: { type: "text" },
      },
      async authorize(credentials, _req) {
        try {
          if (!credentials) {
            return null;
          }

          const { data } = await reissue(
            credentials.accessToken,
            credentials.refreshToken
          );

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
        const { data } = await reissue(
          token.accessToken as string,
          token.refreshToken as string
        );
        console.log("token refresh");
        const decode = jwtDecode<AccessTokenPayload>(data.accessToken);
        return {
          ...token,
          ...data,
          accessToken_exp: decode.exp,
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
};

export default authOption;
