import styles from "./Cadastro.module.css";
import Navbar from "../../components/Navbar/Navbar";
import CustomInput from "../../components/Inputs/CustomInput";
import CustomSelect from "../../components/Inputs/CustomSelect";
import useCadastro from "../../hooks/ModelForm/useCadastro";
const Cadastro = () => {
  const {
    apiError,
    loading,
    errors,
    setErrors,
    status,
    setStatus,
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
  } = useCadastro();

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

  const handleStatus = (e) => {
    const newCamp = e.target.value;
    setStatus(newCamp);
    if (newCamp === "consumable") {
      setSerial("");
      setRecord("");
    } else {
      setAmount("");
    }

    setErrors((prev) =>
      prev.filter((n) => !["itemTip", "serial", "tombamento", "quantid"].includes(n)),
    );
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.card}>
        <div className={styles.form}>
          <h2 className={styles.title}>Cadastro de item</h2>
          <div className={styles.formInput}>
            <CustomSelect
              nameTitle="Tipo do item"
              placeholder="Selecione"
              name="itemTip"
              onChange={handleStatus}
              value={status}
              options={ListValue}
              className={styles.customSelect}
              errorField={errors}
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
              isDisabled={!isPermanent}
              className={styles.customInput}
              errorField={errors}
            />
            <CustomInput
              nameTitle="Quantidade"
              name="quantid"
              type="number"
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 7) {
                  setAmount(value);
                  updateListError("quantid");
                }
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
          {apiError && <p>{apiError}</p>}
          <button className={styles.btn} onClick={handleSubmit} disabled={loading}>
            {loading ? "Salvando..." : "Criar"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Cadastro;
