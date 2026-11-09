import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";

const useCadastro = () => {
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState("");
  const [itemName, setItemName] = useState("");
  const [mark, setMark] = useState("");
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const [record, setRecord] = useState("");
  const [amount, setAmount] = useState("");
  const [observation, setObservation] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const updateListError = (name) => {
    setErrors((prev) => prev.filter((n) => n !== name));
  };

  const validation = () => {
    const newErros = [];

    if (!status) newErros.push("itemTip");
    if (!itemName.trim()) newErros.push("nomeItem");
    if (!mark.trim()) newErros.push("marca");
    if (!model.trim()) newErros.push("modelo");
    if (status === "permanent" && !serial.trim()) newErros.push("serial");
    if (status === "permanent" && !record.trim()) newErros.push("tombamento");
    if (status === "consumable" && !(Number(amount) > 0)) newErros.push("quantid");

    setErrors(newErros);
    return newErros.length === 0;
  };

  const handleSubmit = async () => {
    setApiError("");
    if (!validation()) return;

    const payload = {
      status,
      itemName,
      mark,
      model,
      amount: status === "consumable" ? Number(amount) : null,
      serial: status === "permanent" ? serial : null,
      record: status === "permanent" ? record : null,
      observation: observation || null,
    };

    try {
      setLoading(true);
      await api.post("/api/inventory", payload);
      navigate("/Inventory/Consulta");
    } catch (error) {
      if (error.response?.status === 409) {
        setApiError("Já existe um item com esse tombamento");
      } else {
        setApiError("Não foi possível salvar o item");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    //States
    errors,
    status,
    itemName,
    mark,
    model,
    serial,
    record,
    amount,
    observation,
    loading,
    apiError,

    //Setters
    setErrors,
    setStatus,
    setItemName,
    setMark,
    setModel,
    setSerial,
    setRecord,
    setAmount,
    setObservation,

    //Function
    handleSubmit,
    updateListError,
  };
};

export default useCadastro;
