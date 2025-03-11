"use client";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function SearchBar({ searchTerm, onSearch }) {
  return (
    <Input
      type="text"
      placeholder="Buscar"
      className="busqueda"
      prefix={<SearchOutlined style={{ color: "#6b7280" }} />}
      value={searchTerm}
      onChange={onSearch}
    />
  );
}
