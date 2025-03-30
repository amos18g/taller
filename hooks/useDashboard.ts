"use client";
import { useState, useEffect } from "react";

// se establece la fecha actual como parametro
export function useDashboard(fecha: string = new Date().toISOString().split("T")[0]) {

    const [ingresosMes, setIngresosMes] = useState<number | null>(null);
    const [ingresosDia, setIngresosDia] = useState<number | null>(null);
    const [ventasDelDia, setventasDelDia] = useState<number | null>(null);
    const [ventasDelMes, setventasDelMes] = useState<number | null>(null);
    const [gastos, setGastos] = useState<number | null>(null);
    
    const [ingresosUltimosMeses, setIngresosUltimosMeses] = useState();
    
    const [productosMasVendidos,setProductosMasVendidos] = useState();
    const [categoriasMasVendidas, setCategoriasMasvendidas] = useState();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchIngresosMes() {
        try {
            const response = await fetch(`/api/Dashboard/ingresos/delMes?fecha=${fecha}`);
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
            const response = await fetch(`/api/Dashboard/ingresos/delDia?fecha=${fecha}`);
            if (!response.ok) throw new Error("Error al obtener los ingresos");

            const result = await response.json();
            if (typeof result.total === "number") setIngresosDia(result.total);
            else throw new Error("El formato de los datos recibidos no es válido");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        }
    }

    async function fetchVentasDelDia() {
        try {
            const response = await fetch(`/api/Dashboard/ventas/delDia?fecha=${fecha}`);
            if (!response.ok) throw new Error("Error al las ventas del dia");

            const result = await response.json();
            if (typeof result.cantidad === "number") setventasDelDia(result.cantidad);
            else throw new Error("El formato de los datos recibidos no es válido");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        }
    }

    async function fetchventasDelMes() {
        try {
            const response = await fetch(`/api/Dashboard/ventas/delMes?fecha=${fecha}`);
            if (!response.ok) throw new Error("Error al obtener las ventas del mes");

            const result = await response.json();
            if (typeof result.cantidad === "number") setventasDelMes(result.cantidad);
            else throw new Error("El formato de los datos recibidos no es válido");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        }
    }


    async function fetchIngresosUltimosMeses() {
        try {
          const response = await fetch("/api/Dashboard/ingresos/ultimosMeses");
          if (!response.ok) throw new Error("Error al obtener los ingresos");
      
          const result = await response.json();
          setIngresosUltimosMeses(result);
          if (!Array.isArray(result)) throw new Error("Formato de datos incorrecto");
      
          return result;
        } catch (err) {
          throw new Error(err instanceof Error ? err.message : "Error desconocido");
        }
      }

    async function fetchGastos() {
        try {
            const response = await fetch(`/api/Dashboard/gastosTotalPorMes?fecha=${fecha}`);
            if (!response.ok) throw new Error("Error al obtener los gastos");

            const result = await response.json();
            if (typeof result.total === "number") setGastos(result.total);
            else throw new Error("El formato de los datos recibidos no es válido");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        }
    }

    async function fetchProductosMasVendidos() {
        try {
            const response = await fetch(`/api/Dashboard/ProductosMasVendidos?limite=${5}`);
            if (!response.ok) throw new Error("Error al obtener los gastos");

            const result = await response.json();
            setProductosMasVendidos(result);
           
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        }
    }

    async function fetchCategoriasMasVendidas() {
        try {
            const response = await fetch(`/api/Dashboard/categoriasMasVendidas?limite=${5}`);
            if (!response.ok) throw new Error("Error al obtener los gastos");

            const result = await response.json();
            setCategoriasMasvendidas(result);
            
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        }
    }

    useEffect(() => {

        async function fetchData() {
            setLoading(true);
            await fetchVentasDelDia();
            await fetchIngresosDia();
            await fetchventasDelMes();
            await fetchIngresosMes();
            await fetchGastos();
            await fetchIngresosUltimosMeses();
            await fetchProductosMasVendidos();
            await fetchCategoriasMasVendidas();
       
           
            setLoading(false);
        }
        fetchData();
    }, [fecha]);

    return { 
        ventasDelDia,
        ingresosMes,
        ventasDelMes,
        ingresosDia,
        gastos,
        ingresosUltimosMeses,
        productosMasVendidos,
        categoriasMasVendidas,
        loading,
        error };
}
