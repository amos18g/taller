import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="w-full max-w-sm bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
          Iniciar Sesión
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
          No tienes una cuenta?{" "}
          <Link
            className="text-blue-500 dark:text-blue-400 font-medium underline"
            href="/sign-up"
          >
            Regístrate
          </Link>
        </p>
        <div className="flex flex-col gap-3 mt-6">
          <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
            Correo
          </Label>
          <Input name="email" placeholder="you@example.com" required />

          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
              Contraseña
            </Label>
            
          </div>
          <Input type="password" name="password" placeholder="Tu contraseña" required />

          <SubmitButton pendingText="Iniciando sesión..." formAction={signInAction}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Iniciar sesión
          </SubmitButton>
          <FormMessage message={searchParams} />
          <Link
              className="text-xs text-blue-500 dark:text-blue-400 underline flex justify-center"
              href="/forgot-password"
            >
              ¿Olvidaste tu contraseña?
            </Link>
        </div>
      </form>
    </div>
  );
}
