"use client";
import { useState, useEffect } from "react";

export function useDashboard(  
    ventasDiaFecha: string,
    ingresosDiaFecha: string,
    ventasMesFecha: string,
    ingresosMesFecha: string,
    gastosMesFecha: string) {
    // Estados para los datos
    const [ingresosMes, setIngresosMes] = useState<number | null>(null);
    const [ingresosDia, setIngresosDia] = useState<number | null>(null);
    const [ventasDelDia, setventasDelDia] = useState<number | null>(null);
    const [ventasDelMes, setventasDelMes] = useState<number | null>(null);
    const [gastos, setGastos] = useState<number | null>(null);
    const [ingresosUltimosMeses, setIngresosUltimosMeses] = useState<any>(null);
    const [productosMasVendidos, setProductosMasVendidos] = useState<any>(null);
    const [categoriasMasVendidas, setCategoriasMasvendidas] = useState<any>(null);

    // Estados de loading individuales
    const [loadingIngresosMes, setLoadingIngresosMes] = useState(true);
    const [loadingIngresosDia, setLoadingIngresosDia] = useState(true);
    const [loadingVentasDia, setLoadingVentasDia] = useState(true);
    const [loadingVentasMes, setLoadingVentasMes] = useState(true);
    const [loadingGastos, setLoadingGastos] = useState(true);
    const [loadingIngresosMeses, setLoadingIngresosMeses] = useState(true);
    const [loadingProductos, setLoadingProductos] = useState(true);
    const [loadingCategorias, setLoadingCategorias] = useState(true);

    const [error, setError] = useState<string | null>(null);

    // Función para manejar errores
    const handleError = (err: unknown) => {
        setError(err instanceof Error ? err.message : "Error desconocido");
        return err;
    };

    async function fetchVentasDelDia() {
        try {
            const response = await fetch(`/api/Dashboard/ventas/delDia?fecha=${ventasDiaFecha}`);
            if (!response.ok) throw new Error("Error al obtener las ventas del dia");
            const result = await response.json();
            setventasDelDia(typeof result.cantidad === "number" ? result.cantidad : null);
        } catch (err) {
            handleError(err);
        } finally {
            setLoadingVentasDia(false);
        }
    }

    async function fetchIngresosDia() {
        try {
            const response = await fetch(`/api/Dashboard/ingresos/delDia?fecha=${ingresosDiaFecha}`);
            if (!response.ok) throw new Error("Error al obtener los ingresos");
            const result = await response.json();
            setIngresosDia(typeof result.total === "number" ? result.total : null);
        } catch (err) {
            handleError(err);
        } finally {
            setLoadingIngresosDia(false);
        }
    }

    async function fetchventasDelMes() {
        try {
            const response = await fetch(`/api/Dashboard/ventas/delMes?fecha=${ventasMesFecha}`);
            if (!response.ok) throw new Error("Error al obtener las ventas del mes");
            const result = await response.json();
            setventasDelMes(typeof result.cantidad === "number" ? result.cantidad : null);
        } catch (err) {
            handleError(err);
        } finally {
            setLoadingVentasMes(false);
        }
    }

    async function fetchIngresosMes() {
        try {
            const response = await fetch(`/api/Dashboard/ingresos/delMes?fecha=${ingresosMesFecha}`);
            if (!response.ok) throw new Error("Error al obtener los ingresos");
            const result = await response.json();
            setIngresosMes(typeof result.total === "number" ? result.total : null);
        } catch (err) {
            handleError(err);
        } finally {
            setLoadingIngresosMes(false);
        }
    }
   
    async function fetchGastos() {
        try {
            const response = await fetch(`/api/Dashboard/gastosTotalPorMes?fecha=${gastosMesFecha}`);
            if (!response.ok) throw new Error("Error al obtener los gastos");
            const result = await response.json();
            setGastos(typeof result.total === "number" ? result.total : null);
        } catch (err) {
            handleError(err);
        } finally {
            setLoadingGastos(false);
        }
    }

    async function fetchIngresosUltimosMeses() {
        try {
            const response = await fetch(`/api/Dashboard/ingresos/ultimosMeses?fecha=${ingresosMesFecha}"`);
            if (!response.ok) throw new Error("Error al obtener los ingresos");
            const result = await response.json();
            setIngresosUltimosMeses(Array.isArray(result) ? result : null);
        } catch (err) {
            handleError(err);
        } finally {
            setLoadingIngresosMeses(false);
        }
    }


    async function fetchProductosMasVendidos() {
        try {
            const response = await fetch(`/api/Dashboard/ProductosMasVendidos?limite=${5}`);
            if (!response.ok) throw new Error("Error al obtener los productos");
            const result = await response.json();
            setProductosMasVendidos(result);
        } catch (err) {
            handleError(err);
        } finally {
            setLoadingProductos(false);
        }
    }

    async function fetchCategoriasMasVendidas() {
        try {
            const response = await fetch(`/api/Dashboard/categoriasMasVendidas?limite=${5}`);
            if (!response.ok) throw new Error("Error al obtener las categorías");
            const result = await response.json();
            setCategoriasMasvendidas(result);
        } catch (err) {
            handleError(err);
        } finally {
            setLoadingCategorias(false);
        }
    }

    useEffect(() => {
        // Ejecutar todas las consultas en paralelo
        fetchVentasDelDia();
        fetchIngresosDia();
        fetchventasDelMes();
        fetchIngresosMes();
        fetchGastos();
        fetchIngresosUltimosMeses();
        fetchProductosMasVendidos();
        fetchCategoriasMasVendidas();
    }, [ventasDiaFecha, ingresosDiaFecha, ventasMesFecha, ingresosMesFecha, gastosMesFecha]);
    

    return { 
        ventasDelDia,
        ingresosMes,
        ventasDelMes,
        ingresosDia,
        gastos,
        ingresosUltimosMeses,
        productosMasVendidos,
        categoriasMasVendidas,

        loadingVentasDia,
        loadingIngresosDia,
        loadingVentasMes,
        loadingIngresosMes,
        loadingGastos,
        loadingIngresosMeses,
        loadingProductos,
        loadingCategorias,
        error 
    };
}