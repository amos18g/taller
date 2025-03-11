import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "../../styles/inventario.module.css";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className={styles.searchContainer}>
      <Input
        className={styles.busqueda}
        placeholder="Buscar producto"
        value={searchTerm}
        onChange={onSearch}
        prefix={<SearchOutlined className={styles.searchIcon} />}
      />
    </div>
  );
};

export default SearchBar;
