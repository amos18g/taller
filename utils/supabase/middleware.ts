import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { supabase, getProfile } from "../lib/supabaseClient"; // Asegúrate de la ruta correcta

export const updateSession = async (request: NextRequest) => {
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
              headers: request.headers,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Esto actualizará la sesión si expiró (requerido para los componentes del servidor)
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    let {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (user == null) {
      //permitira  buscar el token de autenticación en los headers de la solicitud HTTP. (para el uso de postman)
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        let { data, error } = await supabase.auth.getUser(token);
        user = data?.user || null; // Actualiza 'user' con el resultado del header
        userError = error; // Actualiza 'userError' con el resultado del header
        console.log("Prueba auth header; ");
        console.log("data header", user);
        console.log("error header; ", userError);
      }
    }

    // *** AÑADIDO: Logs justo después de getUser() ***
    // console.log("Middleware - Después de supabase.auth.getUser() - user:", user);
    //console.log("Middleware - Después de supabase.auth.getUser() - userError:", userError);

    const requestedPath = request.nextUrl.pathname;
    const publicPaths = ["/", "/sign-in", "/sign-up"]; // Aca se definen las rutas publicas
    const isPublicPath = publicPaths.includes(requestedPath);

    // ***  VERIFICACIÓN DE AUTENTICACIÓN INICIAL PARA RUTAS PROTEGIDAS (/admin, /user, /protected) ***
    if (!user && !isPublicPath) {
      // Si NO hay usuario y NO es ruta pública
      const loginUrl = new URL(`/sign-in`, request.url); // Redirige a /sign-in
      return NextResponse.redirect(loginUrl); // ¡Redirección INMEDIATA a login si no autenticado!
    }

    // *** Roles basados en logica (SE EJECUTA SOLO SI HAY USUARIO AUTENTICADO) ***
    if (user) {
      const { data: userProfile, error: profileError } = await supabase
        .from("user") // tabla usuario
        .select("id, role")
        .eq("id", user?.id)
        .single();

     /* console.log(
        "Middleware - profileData:",
        JSON.stringify(userProfile, null, 2)
      );*/

      if (userProfile && userProfile.role) {
        // Valida si el user esta logeado y tiene un rol
        console.log("prueba role 0");
        const userRole = userProfile.role;

        if (userRole === "admin") {
          console.log("prueba role 1");
          console.log(userRole);
          if (request.nextUrl.pathname.startsWith("/user")) {
            // en  caso de accesar al segmento de usuario pero es admin
            return NextResponse.redirect(new URL("/inicio", request.url)); // redirige al area del admin
          }
        } else {
          // rol usario normal
          console.log("prueba role 2");
          console.log(userRole);
          if (
            request.nextUrl.pathname.startsWith("/admin") ||
            request.nextUrl.pathname.startsWith("/inicio")
          ) {
            // no tiene rol de admin, rutas a las que no puede acceder
            return NextResponse.redirect(new URL("/user", request.url)); // redirige al area del usuario
          }
        }
      } else {
        console.error(
          "Error al obtener el perfil o rol del usuario en el middleware:",
          profileError
        );
      }
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};

export const config = {
  matcher: [
    /*
     * Match only specific protected paths:
     * - /admin/...
     * - /user/...
     * - /protected/...
     *  This matcher is *more specific* and *excludes* public paths.
     */

    "/admin/:path*",
    "/user/:path*",
    "/protected/:path*",
    "/inicio/:path*",
  ],
};
