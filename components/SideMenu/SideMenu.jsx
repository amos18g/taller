import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";

function SideMenu() {
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
            key: "/sales",
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
