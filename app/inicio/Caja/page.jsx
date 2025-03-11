/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store/CartStore";
import { Space } from "antd";
import { useProcesarVenta } from "@/hooks/useVentas";
import "./caja.css";

const CartItem = ({ item, updateQty, removeFromCart }) => {
  return (
    <div className="flex items-center bg-white p-1 mb-4 rounded-lg shadow" id="divCarrito">
      
      <div className="flex flex-grow" id="divContenidoCarrito">
        <h2 className="text-lg font-semibold text-black">{item.nombre}</h2>
        <p className="text-red-500">${item.precio_venta}</p>
        <div className="flex flex-grow mt-2" id="divIncrementadores">
          <Button
            onClick={() => updateQty("decrement", item.id_producto)}
            variant="outline"
            size="sm"
          >
            -
          </Button>
          <span className="mx-2 p-3">{item.quantity}</span>
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
        id="botonCarrito"
      >
        Borrar
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
    <div className="flex flex-grow md:col-span-1" id="divTotal">
      <div className="p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Total</h2>
        <div className="flex justify-between mb-2 gap-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2 gap-2">
          <span>Impuesto</span>
          <span>${impuesto}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t gap-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        {error && <p className="w-full mt-2">{error}</p>}
        <Button className="w-full mt-3" onClick={onSubmit} disabled={loading} id="btnVenta">
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
    <>
      <div className="parent">
      <h1 className="text-3xl font-bold">Caja</h1>
        <div className="flex titulo-caja">
        <h2 className="text-2xl">
            Cantidad de Productos ({items.reduce((sum, i) => sum + i.quantity, 0)})
          </h2>
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
    </>
  );
};

export default CartComponent;
