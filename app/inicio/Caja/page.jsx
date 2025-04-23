/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store/CartStore";
import { Space, Divider } from "antd";
import { useProcesarVenta } from "@/hooks/useVentas";
import { Card } from "antd";
import ClienteModal from "@/components/Caja/ClienteModal";
import { useState } from "react";

import "./caja.css";
import { useAuth } from "@/context/AuthContext";




const CartItem = ({ item, updateQty, removeFromCart }) => {
  const isMaxQuantity = item.quantity >= item.stock; // Verifica si la cantidad supera el stock

  return (
    <Card
      size="small"
      title={item.nombre + " " + "$" + item.precio_venta}
      extra={<a href="#"></a>}
      style={{
        width: 700,
        height: 150,
        margin: 4,
      }}
      className="shadow-md rounded-lg"
    >
      <p>En existencia: {item.stock}</p>
      <p>Cantidad: {item.quantity}</p>

      <div className="flex items-center mt-2">
        <Button
          onClick={() => updateQty("decrement", item.id_producto)}
          variant="outline"
          size="sm"
          disabled={item.quantity <= 1}
        >
          -
        </Button>
        <span className="mx-2 p-3">{item.quantity}</span>
        <Button
          onClick={() => updateQty("increment", item.id_producto)}
          variant="outline"
          size="sm"
          disabled={isMaxQuantity}
          className={isMaxQuantity ? "cursor-not-allowed" : ""}
        >
          +
        </Button>

        <Button
          onClick={() => removeFromCart(item.id_producto)}
          variant="destructive"
          size="sm"
          className="ml-auto" // Clase agregada aquí
        >
          Borrar
        </Button>
      </div>
    </Card>
  );
};

const CartList = ({ items, updateQty, removeFromCart }) => {
  return (
    <div className="md:col-span-2">
      {items.map((item) => (
        <CartItem
          key={item.id_producto}
          item={item}
          updateQty={updateQty}
          removeFromCart={removeFromCart}
        />
      ))}
    </div>
  );
};

const CartSummary = ({
  subtotal,
  impuesto,
  total,
  onSubmit,
  loading,
  error,
  cantidadProductos,
  carritoVacio,
  clienteData,
  setClienteData,
}) => {

  const [modalVisible, setModalVisible] = useState(false);

  const handleSaveCliente = (data) => {
    setClienteData(data);
    setModalVisible(false);
  
  };

  return (
    <>
      <ClienteModal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSave={handleSaveCliente}
        clienteData={clienteData}
      />

      <Card
        size="small"
        title="Detalles de la venta"
        style={{
          width: 350,
          margin: 4,
        }}
        className="shadow-md rounded-lg"
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span>Cantidad de productos</span>
            <span>{cantidadProductos}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Impuesto (15%)</span>
            <span>${impuesto}</span>
          </div>
          <Divider className="my-2" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total General</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {error && <Alert message={error} type="error" className="mt-3" />}

          <div className="flex flex-row gap-1">
            <Button
              type="primary"
              className="w-full salesButton"
              onClick={() => setModalVisible(true)}
              disabled={loading || carritoVacio}
            >
              Ingresar datos del cliente
            </Button>

            <Button
              type="primary"
              className="w-full salesButton"
              onClick={onSubmit}
              disabled={loading || carritoVacio}
       
            >
              {loading ? "Procesando..." : "Realizar Venta"}
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

// En el componente Caja:
const Caja = () => {
  const { items, removeFromCart, updateQty, clearCart } = useCartStore((state) => state);
  const { loading, error, procesarVenta } = useProcesarVenta();
  const user = useAuth();

  const [clienteData, setClienteData] = useState({
    nombre: "",
    correo: "",
    identidad: "",
    rtn: "",
  });

  const subtotal = items.reduce((total, item) => total + item.precio_venta * item.quantity, 0);
  const impuesto = subtotal * 0.15;
  const total = subtotal + impuesto;

  const handleVenta = async () => {
    const requestData = {
      state: {
        items,
        id_cliente: 1,
        id_empleado: user.user.user_metadata.nombre,
        descuento: 0,
        observaciones: "Venta hecha desde el sistema de inventario",
        cliente: clienteData?.nombre ? clienteData : null,
      },
    };

    console.log("datos que se envian",requestData);
    const result = await procesarVenta(requestData);
    if (result && result.success) {
      clearCart();
    } else {
      alert("Hubo un error al procesar la venta.");
    }
  };

  return (
    <>
      <div className="parent">
        <h1 className="text-3xl font-bold">Caja</h1>

        <div className="lista-productos">
          <CartList items={items} updateQty={updateQty} removeFromCart={removeFromCart} />
        </div>
        <div className="total">
          <CartSummary
            subtotal={subtotal}
            impuesto={impuesto.toFixed(2)}
            total={total}
            onSubmit={handleVenta}
            loading={loading}
            error={error}
            cantidadProductos={items.reduce((sum, i) => sum + i.quantity, 0)}
            carritoVacio={items.length === 0}
            clienteData={clienteData}
            setClienteData={setClienteData} 
          />
        </div>
      </div>
    </>
  );
};


export default Caja;
