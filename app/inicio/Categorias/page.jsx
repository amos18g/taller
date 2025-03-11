"use client";
import { useState } from "react";
import { Button } from "antd";
import { useCategorias } from "@/hooks/useCategorias";
import SearchBar from "@/components/Categorias/SearchBar";
import CategoryTable from "@/components/Categorias/CategoryTable";
import EditCategoryDrawer from "./editar/page";
import AddCategoryDrawer from "./agregar/page";
import { PlusOutlined } from "@ant-design/icons";
import styles from "@/styles/category.module.css";

export default function CategoriasPage() {
  const { categorias, loading, crearCategoria, actualizarCategoria, deleteCategoria } = useCategorias();
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditDrawerVisible, setIsEditDrawerVisible] = useState(false);
  const [isAddDrawerVisible, setIsAddDrawerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCategorias = categorias?.filter(
    (categoria) =>
      categoria.nombre.toLowerCase().includes(searchTerm) ||
      (categoria.descripcion && categoria.descripcion.toLowerCase().includes(searchTerm))
  );

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsEditDrawerVisible(true);
  };

  const handleSaveCategory = async (values) => {
    await actualizarCategoria(selectedCategory.id_categoria, values);
    setIsEditDrawerVisible(false);
  };

  const handleAddCategory = async (values) => {
    await crearCategoria(values);
    setIsAddDrawerVisible(false);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategoria(id);
    } catch (error) {
      console.error("Error al eliminar la categoría");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Categorías</h1>
      <div className="titulo flex items-center gap-4 mt-5 mb-4">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <Button type="primary" className={styles.btnAgregar} onClick={() => setIsAddDrawerVisible(true)}>
          <PlusOutlined />
          <span className="ml-2">Agregar Categoría</span>
        </Button>
      </div>
      <CategoryTable
        categorias={filteredCategorias}
        loading={loading}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
      />
      <EditCategoryDrawer
        visible={isEditDrawerVisible}
        onClose={() => setIsEditDrawerVisible(false)}
        category={selectedCategory}
        onSave={handleSaveCategory}
      />
      <AddCategoryDrawer
        visible={isAddDrawerVisible}
        onClose={() => setIsAddDrawerVisible(false)}
        onAdd={handleAddCategory}
      />
    </div>

  );
}
