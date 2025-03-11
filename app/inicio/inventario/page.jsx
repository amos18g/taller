"use client";
import { useEffect, useState } from "react";
import { Space } from "antd";
import InventoryTable from "@/components/inventario/InventoryTable";
import SearchBar from "@/components/inventario/SearchBar";
import ActionButtons from "@/components/inventario/ActionButtons";
import { useProductos } from "@/hooks/useProductos";
import styles from "@/styles/inventario.module.css";

const Inventory = () => {
  const { data, loading, eliminarProducto } = useProductos();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredData(
      data.filter(
        (item) =>
          item.nombre.toLowerCase().includes(value) ||
          item.categoria.toLowerCase().includes(value) ||
          item.unidad.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Inventario</h1>
      <Space size={20} direction="vertical" className="mb-8">
        <div className={styles.buttonContainer}>

          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <div>
            {loading ? "" : `Productos en inventario: ${data?.length || 0}`}
          </div>
        </div>
        <InventoryTable
          data={filteredData}
          loading={loading}
          eliminarProducto={eliminarProducto}
        />
      </Space>
    </div>
  );
};

export default Inventory;
