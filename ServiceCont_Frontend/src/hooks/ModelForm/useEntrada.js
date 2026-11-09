import { useState } from "react";

const useEntrada = () => {
  const [typeEquipment, setTypeEquipment] = useState("");
  const [mark, setMark] = useState("");
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const [record, setRecord] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [school, setSchool] = useState("");
  const [tech, setTech] = useState("");
  const [observation, setObservation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/Dashboard";
  };

  return {
    //States
    typeEquipment,
    mark,
    model,
    serial,
    record,
    deliveryDate,
    school,
    tech,
    observation,

    //Setters
    setTypeEquipment,
    setMark,
    setModel,
    setSerial,
    setRecord,
    setDeliveryDate,
    setSchool,
    setTech,
    setObservation,
    //Function
    handleSubmit,
  };
};

export default useEntrada;
