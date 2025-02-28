"use client"
import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  TableOutlined,
  ShoppingOutlined

} from "@ant-design/icons";
import { Menu, Badge  } from "antd";
import Link from "next/link";
import useCartStore from "@/store/CartStore"; 

function SideMenu() {
  // Obtén la cantidad total de productos en el carrito
  const { items } = useCartStore((state) => state);
  const totalItemsInCart = items.reduce((total, item) => total + item.quantity, 0); // Suma la cantidad de todos los productos

  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        style={{ width: 256 }}
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
            icon: <ShoppingCartOutlined />,
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
                {/* Agregar un Badge para mostrar el número de productos */}
                {totalItemsInCart > 0 && (
                  <Badge color="success" count={totalItemsInCart} style={{
                    backgroundColor: '#52c41a',
                    marginLeft: '5px',
                  }}/>
                )}
              </Link>
            ),
            icon: <ShoppingOutlined />,
            key: "/Caja",
          },
          
          /*
          {
            
            label: <Link href="/inicio/Dashboard">Dashboard</Link>,
            icon: <AppstoreOutlined />,
            key: "/Dashboard",
          },*/
        ]}
      />
    </div>
  );
}

export default SideMenu;
