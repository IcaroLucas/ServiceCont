import { useState } from "react";
import api from "../../services/api";
import { getUser } from "../../utils/auth";

const useProfile = () => {
  const user = getUser();
  const isAdmin = user?.role === "ADMIN";

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");

  const updateListError = (field) => {
    setErrors((prev) => prev.filter((n) => n !== field));
  };

  const validation = () => {
    const newErrors = [];
    if (!name.trim()) newErrors.push("nome");
    if (!password.trim()) newErrors.push("senha");
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async () => {
    setApiError("");
    setSuccess("");
    if (!validation()) return;

    try {
      setLoading(true);
      await api.post("/users", { name: name.trim(), password });
      setSuccess(`Usuário "${name.trim()}" criado com sucesso`);
      setName("");
      setPassword("");
    } catch (error) {
      if (error.response?.status === 409) {
        setApiError("Já existe um usuário com esse nome");
      } else {
        setApiError("Não foi possível criar o usuário");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isAdmin,
    name,
    setName,
    password,
    setPassword,
    errors,
    loading,
    apiError,
    success,
    updateListError,
    handleSubmit,
  };
};

export default useProfile;
