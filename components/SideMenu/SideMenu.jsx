"use client";
import "@/styles/sidemenu.module.css";

import React from "react";
import {
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  TableOutlined,
  ShoppingOutlined,
  TruckOutlined,
  LineChartOutlined
} from "@ant-design/icons";
import { Menu, Badge } from "antd";
import Link from "next/link";
import useCartStore from "@/store/CartStore";
import { useAuth } from "@/context/AuthContext";

function SideMenu() {
  
  const { isSuperAdmin } = useAuth();
  const { items } = useCartStore((state) => state);
  const totalItemsInCart = items.reduce((total, item) => total + item.quantity, 0);

  console.log("el rol es:",isSuperAdmin);
  // Array de items del menú construido dinámicamente
  const menuItems = [
    {
      label: <Link href="/inicio/inventario">Inventario</Link>,
      icon: <ShopOutlined />,
      key: "/inventario",
    },
    {
      label: <Link href="/inicio/Categorias">Categorias</Link>,
      icon: <TableOutlined />,
      key: "/Categorias",
    },
    // Item condicional para Usuarios
    ...(isSuperAdmin
      ? [
          {
            label: <Link href="/inicio/registro-Usuarios">Usuarios</Link>,
            icon: <UserOutlined />,
            key: "/Usuarios",
          },
        ]
      : []),
    {
      label: <Link href="/inicio/Dashboard">Dashboard</Link>,
      icon: <LineChartOutlined />,
      key: "/Dashboard",
    },
    // Item condicional para Compras
    ...(isSuperAdmin
      ? [
          {
            label: <Link href="/inicio/Compras">Compras</Link>,
            icon: <TruckOutlined />,
            key: "/Compras",
          },
        ]
      : []),
    {
      label: <Link href="/inicio/Ventas">Ventas</Link>,
      icon: <ShoppingCartOutlined />,
      key: "/Sales",
    },
    {
      label: (
        <Link href="/inicio/Caja">
          Caja
          {totalItemsInCart > 0 && (
            <Badge
              color="success"
              count={items.length}
              style={{ backgroundColor: "#52c41a", marginLeft: "5px" }}
            />
          )}
        </Link>
      ),
      icon: <ShoppingOutlined />,
      key: "/Caja",
    },
  ];

  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        style={{ width: 256, transition: "width 0.3s ease" }}
        defaultSelectedKeys={["/inventario"]}
        items={menuItems} // Usa el array dinámico aquí
      />
    </div>
  );
}

export default SideMenu;
