
export const totalVentas = 120;
export const totalInventario = 450;
export const totalClientes = 300;
export const totalIngresos = 25000;
export const totalGastos = 15000;


export const productosMasVendidos = [
  { key: 1, nombre: "Laptop", cantidad: 10, precio: "$1000" },
  { key: 2, nombre: "Mouse", cantidad: 25, precio: "$25" },
  { key: 3, nombre: "Teclado", cantidad: 15, precio: "$45" },
];

export const ventasPorMes = {
  labels: ["Enero", "Febrero", "Marzo"],
  datasets: [
    {
      label: "Ventas ($)",
      data: [5000, 8000, 12000],
      backgroundColor: "#48f148",
      borderColor: "rgba(0, 100, 0, 1)",
      borderWidth: 1,
    },
  ],
};


export const comprasPorMes = {
  labels: ["Enero", "Febrero", "Marzo"],
  datasets: [
    {
      label: "Compras ($)",
      data: [3000, 6000, 9000],
      backgroundColor: "rgba(255, 0, 0, 0.6)",
    },
  ],
};

export const categoriasMasVendidas = {
  labels: ["Aceites", "Frenos", "Cascos", "Accesorios", "Repuestos"],
  datasets: [
    {
      data: [5000, 6000, 2000, 2000, 1000],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"],
      hoverOffset: 4,
    },
  ],
};
