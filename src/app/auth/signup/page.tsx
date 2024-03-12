import SignupForm from "@/components/client/auth/signup/SignupForm";
import Card from "@/components/server/common/Card";

export const metadata = {
  title: "모두의 일기 | 회원가입",
  description: "회원가입 페이지",
};

export default function SignUp() {
  return (
    <Card title="모두의 일기에 가입하세요">
      <SignupForm></SignupForm>
    </Card>
  );
}
