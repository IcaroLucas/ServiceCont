import { useState, useEffect, useMemo } from "react";
import api from "../../services/api";

const useListaInv = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const itemsWithSearch = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        statusLabel: item.status === "consumable" ? "Consumível" : "Permanente",
      })),
    [items],
  );

  const loadItems = async () => {
    try {
      setLoading(true);
      setApiError("");
      const { data } = await api.get("/api/inventory");
      setItems(data);
    } catch {
      setApiError("Erro ao carregar os itens");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente excluir este item?")) return;

    try {
      await api.delete(`/api/inventory/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setApiError("Não foi possível excluir o item");
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return {
    //States
    loading,
    apiError,
    itemsWithSearch,

    //Function
    loadItems,
    handleDelete,
  };
};

export default useListaInv;
