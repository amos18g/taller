/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store/CartStore";
import { Space } from "antd";
import { useProcesarVenta } from "@/hooks/useVentas";
import "./caja.css";

const CartItem = ({ item, updateQty, removeFromCart }) => {
  return (
    <div className="flex items-center bg-white p-4 mb-4 rounded-lg shadow">
      <div className="flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">{item.nombre}</h2>
        <p className="text-gray-600">${item.precio_venta}</p>
        <div className="flex items-center mt-2">
          <Button
            onClick={() => updateQty("decrement", item.id_producto)}
            variant="outline"
            size="sm"
          >
            -
          </Button>
          <span className="mx-2">{item.quantity}</span>
          <Button
            onClick={() => updateQty("increment", item.id_producto)}
            variant="outline"
            size="sm"
          >
            +
          </Button>
        </div>
      </div>
      <Button
        onClick={() => removeFromCart(item.id_producto)}
        variant="destructive"
        size="sm"
      >
        Eliminar
      </Button>
    </div>
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

const CartSummary = ({ subtotal, impuesto, total, onSubmit, loading, error }) => {
  return (
    <div className="md:col-span-1">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Total</h2>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Impuesto</span>
          <span>${impuesto}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <Button className="w-full mt-6" onClick={onSubmit} disabled={loading}>
          {loading ? "Procesando..." : "Realizar Venta"}
        </Button>
      </div>
    </div>
  );
};

const CartComponent = () => {
  const { items, removeFromCart, updateQty, clearCart } = useCartStore((state) => state);
  const { loading, error, data, procesarVenta } = useProcesarVenta();
  
  //Valores solo del Front
  const subtotal = items.reduce((total, item) => total + item.precio_venta * item.quantity,0);
  const impuesto = subtotal * 0.15;
  const total = subtotal + impuesto;

  const handleVenta = async () => {
    const requestData = {
      state: {
        items,
        id_cliente: 1, 
        id_empleado: 1, 
        descuento: 0, 
        observaciones: "Venta desde front",
      },
    };
  
    const result = await procesarVenta(requestData);
  
    if (result && result.success) {
      clearCart(); // Limpia el carrito después de una venta exitosa
      alert(`Venta procesada con éxito. ID: ${result.venta_id}, Total: ${result.total}`);
    } else {
      alert("Hubo un error al procesar la venta.");
    }
  };
  

  return (
    <Space size={20} direction="vertical">
      <div className="parent">
        <div className="tiutulo-caja">
          <h1 className="text-3xl text-gray-900 mb-6">
            Productos ({items.reduce((sum, i) => sum + i.quantity, 0)})
          </h1>
        </div>
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
          />
        </div>
      </div>
    </Space>
  );
};

export default CartComponent;
