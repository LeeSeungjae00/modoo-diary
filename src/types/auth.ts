export interface SignInFormType {
  loginId: string;
  password: string;
}
export interface SignUpFormType extends SignInFormType {
  nickName: string;
  region: "SEOUL" | "BUSAN" | "INCHEON" | "ULSAN" | "GWANGJU";
}
export interface AccessTokenPayload {
  nickName: string;
  role: string;
}
