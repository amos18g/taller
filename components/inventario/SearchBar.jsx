import styles from "../../styles/inventario.module.css";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <>
    <input type="text" placeholder="Buscar producto" className={styles.input} value={searchTerm} onChange={onSearch} />
   
    </>
  );
};

export default SearchBar;
