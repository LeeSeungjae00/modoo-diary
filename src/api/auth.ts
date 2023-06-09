import { SignInFormType, SignUpFormType } from "@/types/auth";
import apiClient from "./modooClient";
import {
  API_ROUTE_AUTH_SIGNIN,
  API_ROUTE_AUTH_SIGNUP,
} from "@/constants/api/auth";

export const postSignUp = (formData: SignUpFormType) => {
  const config = {
    auth: {
      username: formData.loginId,
      password: formData.password,
    },
  };

  const data = {
    nickName: formData.nickName,
    region: formData.region,
  };

  return apiClient.post(API_ROUTE_AUTH_SIGNUP, data, config);
};

export const postSignIn = (formData: SignInFormType) => {
  const config = {
    auth: {
      username: formData.loginId,
      password: formData.password,
    },
  };
  return apiClient.post(API_ROUTE_AUTH_SIGNIN, null, config);
};
