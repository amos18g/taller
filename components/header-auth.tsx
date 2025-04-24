import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Iniciar sesion</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">Registrarse</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (user) {
    // Obtener el nombre del usuario de la tabla public.user
    const { data: userData, error: userDataError } = await supabase
      .from("user")
      .select("nombre")
      .eq("id", user.id)
      .single();

    if (userDataError) {
      console.error("Error al obtener el nombre del usuario:", userDataError);
      return (
        <div className="flex items-center gap-4">
          Hola, {user.id}!
          <form action={signOutAction}>
            <Button type="submit" variant={"ghost"}>
              Cerrar Sesion
            </Button>
          </form>
        </div>
      );
    }

    const nombreUsuario = userData?.nombre || user.id;
    console.log('nombre usuario', nombreUsuario);

    // Actualizar last_sign_in_at en public.user
    const { error: updateError } = await supabase
      .from("user")
      .update({ last_sign_in_at: new Date() })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error al actualizar last_sign_in_at:", updateError);
      // Handle the error appropriately (e.g., log it, show a message)
    }

    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <img src="/img/Taller_logo.png" alt="Logo" className="ml-[-30px] w-[150px] h-12 object-contain  hover:scale-105 transition-transform duration-200" />
          <span className="text-md text-gray-800 font-semibold ml-[-15px]"> Taller Emanuel</span>
        </div>
        <div className="flex items-center gap-4" >
          <div className=" bg-yellow-100 text-gray-900 font-semibold px-6 py-2 shadow-sm text-sm hover:scale-105 transition-transform duration-200 rounded-[10px]">
            Hola, {nombreUsuario}!
          </div>

          <form action={signOutAction}>
            <Button type="submit" variant={"ghost"} className="ml- mr-4 bg-yellow-300 rounded-[10px] text-gray-900 hover:scale-105 transition-transform duration-200">
              Cerrar Sesion
            </Button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex gap-2">
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/sign-in">Iniciar sesion</Link>
        </Button>

      </div>
    );
  }
}