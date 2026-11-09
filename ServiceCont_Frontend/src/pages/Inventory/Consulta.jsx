import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Consulta.module.css";
import ModularTable from "../../components/ModularTable/ModularTable";
import useLista from "../../hooks/ModelForm/useListaInv";

const Consulta = () => {
  const { itemsWithSearch, loading, apiError, handleDelete } = useLista();
  const navigate = useNavigate();

  const rowList = [
    // { key: "status", name: "TIPO" },
    { key: "itemName", name: "ITEM" },
    { key: "mark", name: "MARCA" },
    { key: "model", name: "MODELO" },
    { key: "serial", name: "SERIAL" },
    { key: "record", name: "TOMBAMENTO" },
    { key: "amount", name: "QUANTIDADE" },
  ];

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.card}>
        <div className={styles.form}>
          <h2 className={styles.title}>Consultar equipamento</h2>

          {loading && <p>Carregando...</p>}
          {apiError && <p>{apiError}</p>}

          <ModularTable
            titleList={rowList}
            objectList={itemsWithSearch}
            searchKeys={["status", "statusLabel"]}
            onEdit={(item) => navigate(`/Inventory/Editar/${item.id}`)}
            onDelete={(item) => handleDelete(item.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Consulta;
