import { useParams, useNavigate } from "react-router";
import styles from "./Editar.module.css";
import Navbar from "../../components/Navbar/Navbar";
import CustomInput from "../../components/Inputs/CustomInput";
import CustomSelect from "../../components/Inputs/CustomSelect";
import useEditar from "../../hooks/ModelForm/useEditarInv";

const Editar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    apiError,
    loading,
    errors,
    status,
    itemName,
    setItemName,
    mark,
    setMark,
    model,
    setModel,
    serial,
    setSerial,
    record,
    setRecord,
    amount,
    setAmount,
    observation,
    setObservation,
    handleSubmit,
    updateListError,
  } = useEditar(id);

  const ListValue = [
    { value: "consumable", label: "Consumível" },
    { value: "permanent", label: "Permanente" },
  ];
  const isPermanent = status === "permanent";
  const isConsumable = status === "consumable";

  const upper = (setter, errorName) => (e) => {
    setter(e.target.value.toUpperCase());
    if (errorName) updateListError(errorName);
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.card}>
        <div className={styles.form}>
          <h2 className={styles.title}>Editar item</h2>
          <div className={styles.formInput}>
            <CustomSelect
              nameTitle="Tipo do item"
              placeholder="Selecione"
              name="itemTip"
              value={status}
              options={ListValue}
              className={styles.customSelect}
              errorField={errors}
              isDisabled={true}
            />
            <CustomInput
              nameTitle="Nome do item"
              name="nomeItem"
              type="text"
              onChange={upper(setItemName, "nomeItem")}
              value={itemName}
              className={styles.customInput}
              errorField={errors}
            />
            <CustomInput
              nameTitle="Marca"
              name="marca"
              type="text"
              onChange={upper(setMark, "marca")}
              value={mark}
              className={styles.customInput}
              errorField={errors}
            />
            <CustomInput
              nameTitle="Modelo"
              name="modelo"
              type="text"
              onChange={upper(setModel, "modelo")}
              value={model}
              className={styles.customInput}
              errorField={errors}
            />
            <CustomInput
              nameTitle="Serial"
              name="serial"
              type="text"
              onChange={upper(setSerial, "serial")}
              value={serial}
              isDisabled={!isPermanent}
              className={styles.customInput}
              errorField={errors}
            />
            <CustomInput
              nameTitle="Tombamento"
              name="tombamento"
              type="text"
              onChange={upper(setRecord, "tombamento")}
              value={record}
              isDisabled={true}
              className={styles.customInput}
              errorField={errors}
            />
            <CustomInput
              nameTitle="Quantidade"
              name="quantid"
              type="number"
              onChange={(e) => {
                setAmount(e.target.value);
                updateListError("quantid");
              }}
              value={amount}
              isDisabled={!isConsumable}
              className={styles.customInput}
              errorField={errors}
            />
            <CustomInput
              nameTitle="Observações"
              name="observacoes"
              isTextArea={true}
              onChange={upper(setObservation)}
              value={observation}
              className={styles.customInput}
            />
          </div>

          {apiError && <p className={styles.error}>{apiError}</p>}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => navigate("/Inventory/Consulta")}
            >
              Cancelar
            </button>
            <button className={styles.btn} onClick={handleSubmit} disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Editar;
