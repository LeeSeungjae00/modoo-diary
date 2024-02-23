import { SignInFormType } from "@/types/auth";
import {
  API_ROUTE_AUTH_REISSUE,
  API_ROUTE_AUTH_SIGNIN,
} from "@/constants/api/auth";

export const postSignIn = async (data: SignInFormType) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORIGIN_SERVER}${API_ROUTE_AUTH_SIGNIN}`,
    {
      method: "POST",
      headers: new Headers({
        Authorization:
          "Basic " +
          Buffer.from(data.loginId + ":" + data.password).toString("base64"),
        "Content-Type": "application/json",
      }),
    }
  );

  return await res.json();
};

export const reissue = async (accessToken: string, refreshToken: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORIGIN_SERVER}${API_ROUTE_AUTH_REISSUE}`,
    {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        accessToken,
        refreshToken,
      }),
    }
  );

  return await res.json();
}