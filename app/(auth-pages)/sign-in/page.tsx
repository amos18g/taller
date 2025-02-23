import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex items-center justify-center min-h-[90vh] w-full">
      <div className="w-full sm:max-w-2xl lg:w-[450px] bg-white dark:bg-gray-900 p-8 rounded-[12px] shadow-md border border-gray-200 relative">
        {/* Logo */}
        <div
          className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 w-32 h-32 bg-white dark:bg-gray-900 rounded-full shadow-md flex 
        items-center justify-center border border-gray-300 gap-4"
        >
          <img
            src="/img/taller-logo.png"
            alt="Logo del taller"
            className="w-full h-full rounded-full"
          />
        </div>

        <form className="flex flex-col mt-20 gap-1">
          <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
            Iniciar Sesión
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
            ¿Aún no tienes una cuenta?{" "}
            <Link
              className="text-blue-500 dark:text-blue-500 font-medium hover:text-blue-700 dark:hover:text-blue-300 focus:underline focus:outline-none 
              focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-1 transition duration-300 ease-in-out"
              href="/sign-up"
            >
              Regístrate
            </Link>
          </p>
          <div className="flex flex-col gap-3 mt-3">
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
              Correo
            </Label>
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

            <div className="flex justify-between items-center">
              <Label
                htmlFor="password"
                className="mt-2 text-gray-700 dark:text-gray-300"
              >
                Contraseña
              </Label>
            </div>
            <div className="relative">
              <LockOutlined className="absolute left-4 top-3 text-gray-500 dark:text-gray-400" />
              <Input
                type="password"
                name="password"
                placeholder="Tu contraseña"
                required
                className="w-full pl-10 py-3 border border-blue-200 rounded-[12px] bg-blue-100 dark:bg-gray-800 dark:border-gray-700
                focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-300 focus:border-blue-500 placeholder-gray-500 
                dark:placeholder-gray-400 placeholder-opacity-75 shadow-sm hover:shadow-md transition"
              />
            </div>

            <SubmitButton
              pendingText="Iniciando sesión..."
              formAction={signInAction}
              className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-[12px] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
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
    </div>
  );
}
