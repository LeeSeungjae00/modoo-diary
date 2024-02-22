import { postSignIn } from "@/api/auth";
import { reissue } from "@/api/modooClient";
import { API_ROUTE_AUTH_REISSUE, API_ROUTE_AUTH_SIGNIN } from "@/constants/api/auth";
import { setAuthToken } from "@/lib/authUtill";
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
        const res = await fetch(
          `http://mingky.me:22001${API_ROUTE_AUTH_SIGNIN}`,
          {
            method: "POST",
            headers: new Headers({
              Authorization:
                "Basic " +
                Buffer.from(
                  credentials!.username + ":" + credentials!.password
                ).toString("base64"),
              "Content-Type": "application/json",
            }),
          }
        );

        const { data } = await res.json();

        const user = jwtDecode<AccessTokenPayload>(data.accessToken);

        if (res.ok) {
          return {
            id: user.sub,
            name: user.nickName,
            role: user.role,
            accessToken_exp : user.exp,
            accessToken: data.accessToken,
            refreshToken : data.refreshToken,
          };
        }
        return null;
      },
    }),
  ],
  // 추가된 부분
  callbacks: {
    async jwt({token, user}) {
      if(token.accessToken_exp){
        console.log("test", token)
        const res = await fetch(
          `http://mingky.me:22001${API_ROUTE_AUTH_REISSUE}`,
          {
            method: "POST",
            headers: new Headers({
              Authorization:
                "Bearer " + token.accessToken
                ,
              "Content-Type": "application/json",
            }
            ),
            body : JSON.stringify({
              accessToken: token.accessToken,
              refreshToken : token.refreshToken,
            })
          }
        );
        const {data} = await res.json();
        const decode = jwtDecode<AccessTokenPayload>(data.accessToken);
        return {
          ...token, ...data, exp : decode.exp
        }
      }
      return {...token, ...user};
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
async function generateToken(user: any) {
    console.log("test")
  }

