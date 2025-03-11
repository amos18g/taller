"use client";
import React from "react";
import VentasTable from "@/components/Ventas/VentasTable";

export default function VentasPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
    
      <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Ventas</h1>
      </div>
      <VentasTable />
    </div>
  );
}