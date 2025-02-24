// lib/supabaseClient.ts
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient = createClient(supabaseUrl!, supabaseAnonKey!);

interface UserProfile {
    id: string;
    role?: string;
    created_at?: string;
}

interface ProfileResult {
    user: Session['user'] | null;
    userProfile: UserProfile | null;
    error?: any;
}


export async function getProfile(): Promise<ProfileResult | null> {
   // console.log("getProfile() - Iniciando ejecución"); // *** AÑADIDO ***

    const { data: session, error: sessionError } = await supabase.auth.getSession();

    //console.log("getProfile() - Después de getSession(), session:", session, "sessionError:", sessionError); // *** AÑADIDO ***

    const currentUser = session?.session?.user;

    if (!currentUser) {
        console.log("getProfile() - No hay usuario autenticado (currentUser es null)"); // *** AÑADIDO ***
        return null; // No hay usuario autenticado
    }

    if (sessionError) {
        console.error("getProfile() - Error obteniendo sesión:", sessionError);
        return { user: currentUser, userProfile: null, error: sessionError }; // Devuelve error de sesión
    }


    const { data: userProfile, error: profileError } = await supabase
        .from('user')
        .select('id, role')
        .eq('id', currentUser.id)
        .single();

    //console.log("getProfile() - Después de consulta a 'user' table, userProfile:", userProfile, "profileError:", profileError); // *** AÑADIDO ***


    if (profileError) {
        console.error("getProfile() - Error obteniendo perfil de usuario de la tabla 'user':", profileError);
        return { user: currentUser, userProfile: null, error: profileError }; // Devuelve error de perfil
    }

    //console.log("getProfile() - Retornando ProfileResult exitosamente, userProfile:", userProfile); // *** AÑADIDO ***
    return { user: currentUser, userProfile: userProfile as UserProfile };
}