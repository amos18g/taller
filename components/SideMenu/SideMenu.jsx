import {
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  import { Menu } from 'antd';
  import Link from 'next/link';
  
  function SideMenu() {
    return (
      <div className="SideMenu">
        <Menu
          className="SideMenuVertical"
          mode="vertical"
          style={{ width: 256 }}
          defaultSelectedKeys={['/inventario']}
          
          items={[

            {
                label: <Link href="/inicio/inventario">Inventario</Link>,
                icon: <ShopOutlined />,
                key: "/inventario",
              },
            {
              label: <Link href="/inicio/Dashboard">Dashboard</Link>,
              icon: <AppstoreOutlined />,
              key: "/Dashboard",
            },
           ,
            {
              label: <Link href="/inicio/Ventas">Ventas</Link>,
              icon: <ShoppingCartOutlined />,
              key: "/Ventas",
            },
            {
              label: <Link href="/inicio/Clientes">Clientes</Link>,
              icon: <UserOutlined />,
              key: "/Clientes",
            },
            {
              label: <Link href="/inicio/Ventas">Ventas</Link>,
              icon: <ShoppingCartOutlined />,
              key: "/sales",
            },
          ]}
        />
      </div>
    );
  }
  
  export default SideMenu;
  