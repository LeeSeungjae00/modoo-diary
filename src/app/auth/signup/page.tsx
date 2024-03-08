import SignupForm from "@/components/client/auth/signup/SignupForm";
import Card from "@/components/server/common/Card";

export default function SignUp() {
  return (
    <Card title="모두의 일기에 가입하세요">
      <SignupForm></SignupForm>
    </Card>
  );
}
