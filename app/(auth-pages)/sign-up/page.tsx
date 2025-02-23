import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { MailOutlined, LockOutlined } from "@ant-design/icons"; // Importar los iconos
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  if ("message" in searchParams) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[90vh] w-full">
      <div className="w-full sm:max-w-2xl lg:w-[450px] bg-white dark:bg-gray-900 p-8 rounded-[12px] shadow-md border border-gray-200 relative">
        {/* Logo */}
        <div
          className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 w-32 h-32 bg-white dark:bg-gray-900 rounded-full 
        shadow-md flex items-center justify-center border border-gray-300 gap-4"
        >
          <img
            src="/img/taller-logo.png"
            alt="Logo del taller"
            className="w-full h-full rounded-full"
          />
        </div>
        <h1 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mt-20">
          Registro
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
          ¿Ya tienes una cuenta?{" "}
          <Link
            className="text-blue-500 dark:text-blue-700 font-medium hover:text-blue-700 dark:hover:text-blue-500 focus:underline 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-1 transition duration-300 ease-in-out"
            href="/sign-in"
          >
            Inicia sesión
          </Link>
        </p>
        <form className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="mt-4 text-gray-700 dark:text-gray-300"
          >
            Correo
          </label>
          <div className="relative">
            <MailOutlined className="absolute left-4 top-3 text-gray-500 dark:text-gray-400" />
            <Input
              name="email"
              placeholder="you@example.com"
              required
              className="w-full pl-10 py-3 border border-blue-200 rounded-[12px] bg-blue-100 dark:bg-gray-800 dark:border-gray-700
                focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-300 focus:border-blue-500 placeholder-gray-500 
                dark:placeholder-gray-400 placeholder-opacity-75 shadow-sm hover:shadow-md transition"
            />
          </div>
          <label
            htmlFor="password"
            className="mt-4 text-gray-700 dark:text-gray-300"
          >
            Contraseña
          </label>
          <div className="relative">
            <LockOutlined className="absolute left-4 top-3 text-gray-500 dark:text-gray-400" />
            <Input
              type="password"
              name="password"
              placeholder="Tu contraseña"
              minLength={6}
              required
              className="w-full pl-10 py-3 border border-blue-200 rounded-[12px] bg-blue-100 dark:bg-gray-800 dark:border-gray-700
                focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-300 focus:border-blue-500 placeholder-gray-500 
                dark:placeholder-gray-400 placeholder-opacity-75 shadow-sm hover:shadow-md transition"
            />
          </div>

          <SubmitButton
            formAction={signUpAction}
            pendingText="Registrando..."
            className="mt-5 bg-blue-500 text-white font-semibold py-3 px-6 rounded-[12px] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
          >
            Registrarse
          </SubmitButton>
          <FormMessage message={searchParams} />
        </form>
      </div>
    </div>
  );
}
