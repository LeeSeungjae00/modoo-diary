export const API_ROUTE_AUTH_SIGNUP = "/java/api/auth/signup";
export const API_ROUTE_AUTH_SIGNIN = "/api/auth/login";
export const API_ROUTE_AUTH_REISSUE = "/api/auth/reissue";
export const NAVER_REDIRECT_URL = (origin: string) => {
  return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=K69chQBfn7xsRgAoXG5s&redirect_uri=${origin}/oauth/naver`;
};
export const GOOGLE_REDIRECT_URL = (origin: string) => {
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=1087229900586-mi148fcf7vlc3o3l7k7tf0mgdjg0md1m.apps.googleusercontent.com&redirect_uri=${origin}/oauth/google&response_type=code&scope=email%20profile%20openid&access_type=offline`;
};
