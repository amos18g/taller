/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store/CartStore";
import { Space, Divider } from "antd";
import { useProcesarVenta } from "@/hooks/useVentas";
import { Card } from "antd";

import "./caja.css";

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
        margin: 4
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
  cantidadProductos
}) => {
  return (
    <Card
      size="small"
      title="Detalles de la venta"
      style={{
        width: 350,
        margin: 4
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
        
        <Button
          type="primary"
          className="w-full mt-4"
          onClick={onSubmit}
          disabled={loading}
          id="btnVenta"
        >
          {loading ? "Procesando..." : "Realizar Venta"}
        </Button>
      </div>
    </Card>
  );
};


const CartComponent = () => {
  const { items, removeFromCart, updateQty, clearCart } = useCartStore(
    (state) => state
  );
  const { loading, error, data, procesarVenta } = useProcesarVenta();

  //Valores solo del Front
  const subtotal = items.reduce(
    (total, item) => total + item.precio_venta * item.quantity,
    0
  );
  const impuesto = subtotal * 0.15;
  const total = subtotal + impuesto;

  const handleVenta = async () => {
    const requestData = {
      state: {
        items,
        id_cliente: 1,
        id_empleado: 1,
        descuento: 0,
        observaciones: "Venta hecha desde el sistema de inventario",
      },
    };

    const result = await procesarVenta(requestData);

    if (result && result.success) {
      clearCart(); // Limpia el carrito después de una venta exitosa
       
    } else {
      alert("Hubo un error al procesar la venta.");
    }
  };

  return (
    <>
      <div className="parent">
        <h1 className="text-3xl font-bold">Caja</h1>
      
        <div className="lista-productos">
          <CartList
            items={items}
            updateQty={updateQty}
            removeFromCart={removeFromCart}
          />
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
          />
        </div>
      </div>
    </>
  );
};

export default CartComponent;
