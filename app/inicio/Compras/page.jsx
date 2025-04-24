"use client";
import { useState } from "react";
import { DatePicker, Radio, Button, Space, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import { useCompras } from "@/hooks/useCompras";
import TablaCompras from "@/components/Compras/tablaCompras";
import AgregarProducto from "../inventario/agregar/page";

const { RangePicker } = DatePicker;

export default function Compras() {
  const { compras, loading } = useCompras();

  /* ---- estados de filtrado ---- */
  const [modoBusqueda, setModoBusqueda] = useState(null);      // "dia" | "rango" | "mes"
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [rangoFechas, setRangoFechas] = useState([]);

  /* ---- modal ---- */
  const [modalVisible, setModalVisible] = useState(false);

  /* ---- aplica filtros y devuelve el arreglo a mostrar ---- */
  const filtrarCompras = () => {
    if (!compras) return [];

    if (modoBusqueda === "dia" && fechaSeleccionada) {
      return compras.filter((c) =>
        dayjs(c.fecha_compra).isSame(fechaSeleccionada, "day")
      );
    }

    if (modoBusqueda === "rango" && rangoFechas.length === 2) {
      const [inicio, fin] = rangoFechas;
      return compras.filter((c) =>
        dayjs(c.fecha_compra).isBetween(inicio, fin, null, "[]")
      );
    }

    if (modoBusqueda === "mes" && fechaSeleccionada) {
      return compras.filter((c) =>
        dayjs(c.fecha_compra).isSame(fechaSeleccionada, "month")
      );
    }

    return compras; // sin filtros
  };

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Compras</h1>

        {/* ---------- controles de filtrado ---------- */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="font-semibold">Filtrar compras por:</span>

          <Radio.Group
            value={modoBusqueda}
            onChange={(e) => {
              setModoBusqueda(e.target.value);
              setFechaSeleccionada(null);
              setRangoFechas([]);
            }}
          >
            <Radio.Button value="dia" style={{ width: 120, textAlign: "center" }}>
              Por Día
            </Radio.Button>
            <Radio.Button value="rango" style={{ width: 120, textAlign: "center" }}>
              Por Rango
            </Radio.Button>
            <Radio.Button value="mes" style={{ width: 120, textAlign: "center" }}>
              Por Mes
            </Radio.Button>
          </Radio.Group>

          {modoBusqueda === "dia" && (
            <DatePicker
              style={{ width: 300 }}
              placeholder="Seleccione la fecha"
              onChange={(v) => setFechaSeleccionada(v)}
            />
          )}

          {modoBusqueda === "rango" && (
            <RangePicker
              style={{ width: 300 }}
              placeholder={["Fecha inicio", "Fecha fin"]}
              onChange={(vals) => setRangoFechas(vals)}
            />
          )}

          {modoBusqueda === "mes" && (
            <DatePicker
              picker="month"
              style={{ width: 300 }}
              placeholder="Seleccione el mes"
              onChange={(v) => setFechaSeleccionada(v)}
            />
          )}

          {/* botón agregar compra */}
          <Button onClick={() => setModalVisible(true)} className="ml-auto">
            <PlusOutlined /> Comprar Productos
          </Button>
        </div>

        {/* ---------- tabla ---------- */}
        <Space size={20} direction="vertical" style={{ width: "100%" }}>
          <TablaCompras data={filtrarCompras()} loading={loading} />
        </Space>
      </div>

      {/* ---------- modal ---------- */}
      <Modal
        title="Agregar Producto"
        open={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <AgregarProducto onClose={() => setModalVisible(false)} />
      </Modal>
    </>
  );
}
