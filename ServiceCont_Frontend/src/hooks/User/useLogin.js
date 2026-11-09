import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.APIlocal;

const useLogin = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const updateListError = (name) => {
    setErrors((prev) => prev.filter((n) => n !== name));
    setApiError("");
  };

  const validation = () => {
    const newErrors = [];
    if (!username.trim()) newErrors.push("username");
    if (!password.trim()) newErrors.push("password");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validation()) return;

    try {
      setLoading(true);

      const { data } = await axios.post(`${API_URL}/auth/login`, {
        name: username,
        password: password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ name: data.name, role: data.role }));
      navigate("/Dashboard");
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        setErrors(["username", "password"]);
        setApiError("Usuário ou senha inválidos");
      } else {
        setApiError("Não foi possível conectar ao servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    //States
    errors,
    username,
    password,
    loading,
    apiError,

    //Setters
    setErrors,
    setUsername,
    setPassword,

    //Function
    updateListError,
    handleSubmit,
  };
};
export default useLogin;
