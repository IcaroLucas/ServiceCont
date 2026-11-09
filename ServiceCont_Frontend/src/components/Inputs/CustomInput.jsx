import styles from "./CustomInput.module.css";

const CustomInput = ({
  type,
  name,
  nameTitle,
  placeholder,
  onChange,
  value,
  maxLength,
  autoComplete,
  errorField,
  isDisabled,
  isTextArea,
  className = "",
}) => {
  const haveError = !!errorField?.includes(name);
  const showTitle = !placeholder && !!nameTitle;

  return (
    <div className={`${styles.contain} ${className}`}>
      {showTitle && (
        <div className={styles.title}>
          <label>{nameTitle}</label>
        </div>
      )}
      <div className={styles.inputBox}>
        {isTextArea ? (
          <textarea
            name={name}
            onChange={onChange}
            value={value}
            rows={4}
            className={styles.txtArea}
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            maxLength={maxLength}
            autoComplete={autoComplete}
            disabled={isDisabled}
            className={`${styles.inpt} ${haveError ? styles.inptError : ""} ${isDisabled ? styles.inptDisabled : ""}`}
          />
        )}
      </div>
    </div>
  );
};
export default CustomInput;
