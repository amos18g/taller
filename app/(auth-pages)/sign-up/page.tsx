import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  if ("message" in searchParams) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] mx-4">

      <div className="w-full max-w-sm bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
          Registro
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
          ¿Ya tienes una cuenta?{" "}
          <Link className="text-blue-500 dark:text-blue-400 font-medium underline" href="/sign-in">
            Inicia sesión
          </Link>
        </p>
        <form className="flex flex-col gap-3 mt-6">
          <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
            Correo
          </Label>
          <Input name="email" placeholder="you@example.com" required />

          <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
            Contraseña
          </Label>
          <Input
            type="password"
            name="password"
            placeholder="Tu contraseña"
            minLength={6}
            required
          />

          <SubmitButton formAction={signUpAction} pendingText="Registrando..."
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Registrarse
          </SubmitButton>
          <FormMessage message={searchParams} />
        </form>
      </div>

    </div>
  );
}
