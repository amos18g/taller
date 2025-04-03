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
    const { data: userData, error } = await supabase
      .from("user")
      .select("nombre")
      .eq("id", user.id)
      .single();

      const nombreUsuario = userData?.nombre || user.id; // Usar el nombre o el id si no se encuentra el nombre
      console.log('nombre usuario', nombreUsuario)

    if (error) {
      console.error("Error al obtener el nombre del usuario:", error);
      return (
        <div className="flex items-center gap-4">
          Hola, {nombreUsuario} !  
          <form action={signOutAction}>
            <Button type="submit" variant={"ghost"}>
              Cerrar Sesion
            </Button>
          </form>
        </div>
      );
    }

   

    return (
      <div className="flex items-center gap-4">
        Hola, {nombreUsuario} !
        <form action={signOutAction}>
          <Button type="submit" variant={"ghost"}>
            Cerrar Sesion
          </Button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="flex gap-2">
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/sign-in">Iniciar sesion</Link>
        </Button>
        <Button asChild size="sm" variant={"default"}>
          <Link href="/sign-up">Registrarse</Link>
        </Button>
      </div>
    );
  }
}