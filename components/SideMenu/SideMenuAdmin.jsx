"use client";
import React from "react";
import Link from "next/link";
import { Menu, Badge } from "antd";
import {
  ShopOutlined,
  TableOutlined,
  LineChartOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import useCartStore from "@/store/CartStore";



function SideMenuAdmin() {
  const { items } = useCartStore((state) => state);
  const totalItemsInCart = items.reduce((total, item) => total + item.quantity, 0);

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
    {
      label: <Link href="/inicio/Dashboard">Dashboard</Link>,
      icon: <LineChartOutlined />,
      key: "/Dashboard",
    },
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
        items={menuItems}
      />
    </div>
  );
}

export default SideMenuAdmin;
