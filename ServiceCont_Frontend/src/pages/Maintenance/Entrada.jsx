import styles from "./Entrada.module.css";
import Navbar from "../../components/Navbar/Navbar";
import CustomInput from "../../components/Inputs/CustomInput";
import useEntrada from "../../hooks/ModelForm/useEntrada";
const Entrada = () => {
  const {
    typeEquipment,
    setTypeEquipment,
    mark,
    setMark,
    model,
    setModel,
    serial,
    setSerial,
    record,
    setRecord,
    deliveryDate,
    setDeliveryDate,
    school,
    setSchool,
    tech,
    setTech,
    observation,
    setObservation,
    handleSubmit,
  } = useEntrada();

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.card}>
        <div className={styles.form}>
          <h2 className={styles.title}>Informações do equipamento</h2>
          <div className={styles.formInput}>
            <CustomInput
              nameTitle="Tipo de equipamento"
              name="tipoEquip"
              type="text"
              onChange={(e) => setTypeEquipment(e.target.value)}
              value={typeEquipment}
              className={styles.customInput}
            />
            <CustomInput
              nameTitle="Marca"
              name="marca"
              type="text"
              onChange={(e) => setMark(e.target.value)}
              value={mark}
              className={styles.customInput}
            />
            <CustomInput
              nameTitle="Modelo"
              name="modelo"
              type="text"
              onChange={(e) => setModel(e.target.value)}
              value={model}
              className={styles.customInput}
            />
            <CustomInput
              nameTitle="Serial"
              name="serial"
              type="text"
              onChange={(e) => setSerial(e.target.value)}
              value={serial}
              className={styles.customInput}
            />
            <CustomInput
              nameTitle="Tombamento"
              name="tombamento"
              type="text"
              onChange={(e) => setRecord(e.target.value)}
              value={record}
              className={styles.customInput}
            />
            <CustomInput
              nameTitle="Data de entrega"
              name="dataEnt"
              type="date"
              onChange={(e) => setDeliveryDate(e.target.value)}
              value={deliveryDate}
              className={styles.customInput}
            />
            <CustomInput
              nameTitle="Escola"
              name="escola"
              type="text"
              onChange={(e) => setSchool(e.target.value)}
              value={school}
              className={styles.customInput}
            />
            <CustomInput
              nameTitle="Técnico"
              name="tecnico"
              type="text"
              onChange={(e) => setTech(e.target.value)}
              value={tech}
              className={styles.customInput}
              isDisabled={true}
            />
            <CustomInput
              nameTitle="Observações"
              name="observacoes"
              isTextArea={true}
              onChange={(e) => setObservation(e.target.value)}
              value={observation}
              className={styles.customInput}
            />
          </div>
          <button className={styles.btn} onClick={handleSubmit}>
            Criar
          </button>
        </div>
      </div>
    </div>
  );
};
export default Entrada;
