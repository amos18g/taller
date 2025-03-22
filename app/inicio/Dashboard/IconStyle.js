const iconStyle = (color) => ({
    color: color,
    backgroundColor: `rgba(${color === "green" ? "0,255,0" : color === "blue" ? "0,0,255" : color === "purple" ? "128,0,128" : color === "red" ? "255,0,0" : "255,165,0"},0.25)`,
    borderRadius: 20,
    fontSize: 24,
    padding: 8,
  });
  
  export default iconStyle;
  