"use client"; // Necesario en Next.js 13+ con App Router

import { useRouter } from "next/navigation";

function agregar() {

    const router = useRouter();
    
    return(
        <div>
            Agregar producto
            <button onClick={() => router.back()} className="px-4 py-2 bg-blue-500 text-white rounded">
                Volver
            </button>
        </div>
    )
}

export default agregar;