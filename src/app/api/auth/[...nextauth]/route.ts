import { postSignIn } from "@/api/auth";
import { API_ROUTE_AUTH_SIGNIN } from "@/constants/api/auth";
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
      async authorize(credentials, req) {
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

        console.log(data);

        setAuthToken(data);

        const user = jwtDecode<AccessTokenPayload>(data.accessToken);

        if (res.status === 200) {
          return {
            id: user.sub,
            name: user.nickName,
            role: user.role,
          };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
});

export { handler as GET, handler as POST };
