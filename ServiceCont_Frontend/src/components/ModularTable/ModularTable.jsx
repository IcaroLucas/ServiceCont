import styles from "./ModularTable.module.css";
import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import CustomInput from "../../components/Inputs/CustomInput";

const normalize = (text) =>
  String(text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const ModularTable = ({
  titleList = [],
  objectList = [],
  searchKeys = [],
  keyName = "id",
  advanceLabel,
  advanceLink,
  onEdit,
  onDelete,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const hasActions = Boolean(onEdit || onDelete);
  const selectable = Boolean(advanceLink && advanceLabel);
  const hasSpacer = hasActions && !selectable;
  const totalColumns = titleList.length + (selectable ? 1 : 0) + (hasActions ? 1 : 0);

  const searchFields = [...titleList.map((row) => row.key), ...searchKeys];

  const filteredList = objectList.filter((object) => {
    const term = normalize(search.trim());
    if (!term) return true;
    return searchFields.some((key) => normalize(object[key]).includes(term));
  });

  const handleSelected = (item) => {
    const itemId = item[keyName];
    setMessage("");

    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((selectedId) => selectedId !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const renderValue = (object, row) => {
    const value = object[row.key];

    if (
      value === null ||
      value === undefined ||
      (typeof value === "object" && Object.keys(value).length === 0)
    ) {
      return "-";
    }
    return value;
  };

  const handleAdvance = () => {
    if (selectedItems.length === 0) {
      setMessage(`Selecione ao menos um item para ${advanceLabel.toLowerCase()}`);
      return;
    }

    const selectedObjects = objectList.filter((object) => selectedItems.includes(object[keyName]));
    sessionStorage.setItem("advanceSelectedItems", JSON.stringify(selectedObjects));
    window.location.href = `${advanceLink}/${selectedItems.join(",")}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <div className={styles.innerContent}>
          <div className={styles.search}>
            <CustomInput
              type="search"
              placeholder="Pesquisar"
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr className={styles.tableRowHead}>
                {selectable && <th></th>}
                {hasSpacer && <th className={styles.sideCol}></th>}
                {titleList.map((row, index) => (
                  <th key={row.key || index}>{row.name}</th>
                ))}
                {hasActions && <th></th>}
              </tr>
            </thead>

            <tbody className={styles.tableBody}>
              {filteredList.length > 0 ? (
                filteredList.map((object, index) => {
                  const itemId = object[keyName];
                  return (
                    <tr className={styles.tableRow} key={itemId ?? index}>
                      {selectable && (
                        <td>
                          <CustomInput
                            type="checkbox"
                            className={styles.checkboxInput}
                            checked={selectedItems.includes(itemId)}
                            onChange={() => handleSelected(object)}
                          />
                        </td>
                      )}
                      {hasSpacer && <th className={styles.sideCol}></th>}
                      {titleList.map((row, rowIndex) => (
                        <td key={row.key || rowIndex}>{renderValue(object, row)}</td>
                      ))}

                      {hasActions && (
                        <td>
                          <div className={styles.actions}>
                            {onEdit && (
                              <button
                                type="button"
                                className={styles.iconBtn}
                                onClick={() => onEdit(object)}
                                title="Editar"
                                aria-label="Editar"
                              >
                                <FiEdit2 />
                              </button>
                            )}
                            {onDelete && (
                              <button
                                type="button"
                                className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                                onClick={() => onDelete(object)}
                                title="Excluir"
                                aria-label="Excluir"
                              >
                                <FiTrash2 />
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr className={styles.tableRow}>
                  <td className={styles.tableNotice} colSpan={totalColumns}>
                    {objectList.length === 0
                      ? "Nenhuma lista criada ainda!"
                      : "Nenhum resultado encontrado"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {message && <p className={styles.message}>{message}</p>}

      {selectable && (
        <button className={styles.btn} onClick={handleAdvance}>
          {advanceLabel}
        </button>
      )}
    </div>
  );
};

export default ModularTable;
