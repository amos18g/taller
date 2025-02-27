import { Button } from "antd";
import Link from "next/link";
import styles from "../../styles/inventario.module.css";

const ActionButtons = () => {
  return (
    <>

      <Link href="/inicio/inventario/agregar">
        <Button type="primary">Ingresar Producto</Button>
      </Link>

    </>
  );
};

export default ActionButtons;
