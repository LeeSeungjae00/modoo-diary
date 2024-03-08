import { redirect } from "next/navigation";

export default async function Home(test: any) {
  redirect("/diaries");
}
