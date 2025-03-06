import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

// Interfaces
interface CartItem {
  quantity: number;
  id_producto: string;
  nombre: string;
  precio_venta: number;
  codigo_barras: string;
  
}

interface CartState {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id_producto: string) => void;
  updateQty: (type: "increment" | "decrement", id_producto: string) => void;
  clearCart: () => void;
}

// Acciones del carrito
const createCartActions = (set: any, get: any) => ({

  clearCart: () => {
    set({ items: [] }); // Reinicia los items a un arreglo vacío
    toast.success("Carrito limpiado");
  },

  // Agregar un producto al carrito
  addToCart: (product: CartItem) => {
    // Verifica si el producto ya está en el carrito
    const existingProduct = get().items.find(
      (item: CartItem) => item.id_producto === product.id_producto
    );

    // Si el producto ya está, muestra un error
    if (existingProduct) {
      toast.error("El producto ya está en caja");
      return;
    }

    // Si no está en el carrito, lo agrega
    set({
      items: [
        ...get().items,
        {
          quantity: 1, // Inicializa la cantidad en 1
          id_producto: product.id_producto,
          nombre: product.nombre, 
          precio_venta: product.precio_venta, 
          codigo_barras: product.codigo_barras, 
        },
      ],
    });
    // Muestra un mensaje de éxito
    toast.success("Producto agregado a caja");
    console.log("Carrito después de agregar:", get().items);
  },

  removeFromCart: (id_producto: string) => {
    // Filtra los productos para eliminar el que coincide con el id
    set({
      items: get().items.filter(
        (item: CartItem) => item.id_producto !== id_producto
      ),
    });

    // Muestra un mensaje de éxito
    toast.error("Producto eliminado de la caja");
  },

  updateQty: (type: "increment" | "decrement", id_producto: string) => {
    // Actualiza la cantidad del producto seleccionado
    set((state: CartState) => {
      const updatedItems = state.items.map((item) => {
        if (item.id_producto === id_producto) {
          // Incrementa o decrementa la cantidad
          const newQuantity =
            type === "increment" ? item.quantity + 1 : item.quantity - 1;
          // Asegura que la cantidad nunca sea menor a 1
          return { ...item, quantity: Math.max(newQuantity, 1) };
        }

        return item;
      });
      
      return { items: updatedItems };
    });
  },
});

// Estado inicial del carrito
const initialState = {
  items: [], // El carrito comienza vacío
};

// Configuración de persistencia
const persistConfig = {
  name: "cart-storage", // Nombre para almacenar el carrito en el almacenamiento local
};

// Creación del store
const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      ...initialState, // Estado inicial
      ...createCartActions(set, get), // Añade las acciones al estado
    }),
    persistConfig // Configura la persistencia en el almacenamiento local
  )
);

export default useCartStore;
