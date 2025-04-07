// app/signup/page.tsx
import SignupClient from "@/components/registroUsuarios/SignUpClient";
import { Message } from "@/components/form-message";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return <SignupClient searchParams={searchParams} />;
}
