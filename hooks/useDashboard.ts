"use client";
import { useState, useEffect } from "react";

// se establece la fecha actual como parametro
export function useDashboard(fecha: string = new Date().toISOString().split("T")[0]) {

    const [ingresosMes, setIngresosMes] = useState<number | null>(null);
    const [ingresosDia, setIngresosDia] = useState<number | null>(null);
    const [gastos, setGastos] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchIngresosMes() {
        try {
            const response = await fetch(`/Api/Dashboard/ingresos/delMes?fecha=${fecha}`);
            if (!response.ok) throw new Error("Error al obtener los ingresos");

            const result = await response.json();
            if (typeof result.total === "number") setIngresosMes(result.total);
            else throw new Error("El formato de los datos recibidos no es válido");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        }
    }

    async function fetchIngresosDia() {
        try {
            const response = await fetch(`/Api/Dashboard/ingresos/delDia?fecha=${fecha}`);
            if (!response.ok) throw new Error("Error al obtener los ingresos");

            const result = await response.json();
            if (typeof result.total === "number") setIngresosDia(result.total);
            else throw new Error("El formato de los datos recibidos no es válido");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        }
    }


    async function fetchGastos() {
        try {
            const response = await fetch(`/Api/Dashboard/gastosTotalPorMes?fecha=${fecha}`);
            if (!response.ok) throw new Error("Error al obtener los gastos");

            const result = await response.json();
            if (typeof result.total === "number") setGastos(result.total);
            else throw new Error("El formato de los datos recibidos no es válido");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        }
    }

    useEffect(() => {

        async function fetchData() {
            setLoading(true);
            await fetchIngresosMes();
            await fetchIngresosDia();
            await fetchGastos();
            setLoading(false);
        }
        fetchData();
    }, [fecha]);

    return { ingresosMes, ingresosDia, gastos, loading, error };
}
