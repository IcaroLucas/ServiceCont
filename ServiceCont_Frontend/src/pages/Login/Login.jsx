import styles from "./Login.module.css";
import CustomInput from "../../components/Inputs/CustomInput";
import useLogin from "../../hooks/User/useLogin";
const Login = () => {
  const {
    errors,
    username,
    setUsername,
    password,
    setPassword,
    loading,
    apiError,
    handleSubmit,
    updateListError,
  } = useLogin();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <fieldset className={styles.field}>
            <legend className={styles.legend}>Área de acesso</legend>
            <CustomInput
              nameTitle="Login :"
              type="text"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
                updateListError("username");
              }}
              value={username}
              autoComplete="off"
              maxLength={34}
              className={styles.customInput}
              errorField={errors}
            />
            <CustomInput
              nameTitle="Senha :"
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
                updateListError("password");
              }}
              value={password}
              className={styles.customInput}
              errorField={errors}
            />
            <div className={styles.manipulationBtn}>
              {apiError && <p className={styles.textError}>{apiError}</p>}
              <button type="submit" disabled={loading} className={styles.btn}>
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
export default Login;
