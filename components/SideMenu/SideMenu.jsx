"use client";
import "@/styles/sidemenu.module.css";

import React from "react";
import {
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  TableOutlined,
  ShoppingOutlined,
  TruckOutlined
} from "@ant-design/icons";
import { Menu, Badge } from "antd";
import Link from "next/link";
import useCartStore from "@/store/CartStore";

function SideMenu() {
  // Obtén la cantidad total de productos en el carrito
  const { items } = useCartStore((state) => state);
  const totalItemsInCart = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        style={{ width: 256, transition: "width 0.3s ease" }}
        defaultSelectedKeys={["/inventario"]}
        items={[
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
            label: <Link href="/inicio/Clientes">Clientes</Link>,
            icon: <UserOutlined />,
            key: "/Clientes",
          },
          {
            label: <Link href="/inicio/Compras">Compras</Link>,
            icon: <TruckOutlined />,
            key: "/Compras",
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
                    style={{
                      backgroundColor: "#52c41a",
                      marginLeft: "5px"
                    }}
                  />
                )}
              </Link>
            ),
            icon: <ShoppingOutlined />,
            key: "/Caja",
          },
        ]}
      />
    </div>
  );
}

export default SideMenu;
