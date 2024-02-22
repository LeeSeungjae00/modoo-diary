export interface SignInFormType {
  loginId: string;
  password: string;
}
export interface SignUpFormType extends SignInFormType {
  nickName: string;
  region: "SEOUL" | "BUSAN" | "INCHEON" | "ULSAN" | "GWANGJU";
  passwordConfirmation: string;
}
export interface AccessTokenPayload {
  sub: string;
  nickName: string;
  role: string;
  exp : number
}
