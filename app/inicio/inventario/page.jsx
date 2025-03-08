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
    <Space size={20} direction="vertical">
      <h1 className="text-3xl text-gray-800 mb-10">Inventario de Productos</h1>
      <div className={styles.buttonContainer}>
       
        <div>
          {loading ? "" : `Productos en inventario: ${data?.length || 0}`}
        </div>
        
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      </div>

      <InventoryTable
        data={filteredData}
        loading={loading}
        eliminarProducto={eliminarProducto}
      />
    </Space>
  );
};

export default Inventory;
