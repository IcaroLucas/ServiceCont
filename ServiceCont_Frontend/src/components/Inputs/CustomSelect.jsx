import styles from "./CustomSelect.module.css";

const CustomSelect = ({
  name,
  nameTitle,
  placeholder,
  onChange,
  value,
  options = [],
  errorField,
  isDisabled,
  className = "",
}) => {
  const haveError = !!errorField?.includes(name);
  const showTitle = !!nameTitle;

  return (
    <div className={`${styles.contain} ${className}`}>
      {showTitle && (
        <div className={styles.title}>
          <label htmlFor={name}>{nameTitle}</label>
        </div>
      )}
      <div className={styles.inputBox}>
        <select
          id={name}
          name={name}
          onChange={onChange}
          value={value}
          disabled={isDisabled}
          className={`${styles.inpt} ${haveError ? styles.inptError : ""} ${isDisabled ? styles.inptDisabled : ""}`}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomSelect;
