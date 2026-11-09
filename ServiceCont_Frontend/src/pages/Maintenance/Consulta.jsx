import Navbar from "../../components/Navbar/Navbar";
import styles from "./Consulta.module.css";
import ModularTable from "../../components/ModularTable/ModularTable";

const Consulta = () => {
  const rowList = [
    { key: "typeEquipment", name: "TIPO DE EQUIPAMENTO" },
    { key: "mark", name: "MARCA" },
    { key: "model", name: "MODELO" },
    { key: "serial", name: "SERIAL" },
    { key: "record", name: "TOMBAMENTO" },
  ];

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.card}>
        <div className={styles.form}>
          <h2 className={styles.title}>Consultar equipamento</h2>
          <ModularTable titleList={rowList} />
          <div className={styles.table}></div>
        </div>
      </div>
    </div>
  );
};

export default Consulta;
