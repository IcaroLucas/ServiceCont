import styles from "./Perfil.module.css";
import Navbar from "../../components/Navbar/Navbar";
import CustomInput from "../../components/Inputs/CustomInput";
import useProfile from "../../hooks/User/usePorfile";

const Perfil = () => {
  const {
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
  } = useProfile();

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.card}>
        <div className={styles.form}>
          <h2 className={styles.title}>Perfil</h2>
          <p className={styles.userInfo}>
            Usuário: <strong>{user?.name}</strong>
          </p>

          {isAdmin && (
            <div className={styles.section}>
              <h3 className={styles.subtitle}>Criar novo usuário</h3>
              <div className={styles.formInput}>
                <CustomInput
                  nameTitle="Nome"
                  name="nome"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    updateListError("nome");
                  }}
                  className={styles.customInput}
                  errorField={errors}
                />
                <CustomInput
                  nameTitle="Senha"
                  name="senha"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    updateListError("senha");
                  }}
                  className={styles.customInput}
                  errorField={errors}
                />
              </div>

              {apiError && <p className={styles.error}>{apiError}</p>}
              {success && <p className={styles.success}>{success}</p>}

              <button className={styles.btn} onClick={handleSubmit} disabled={loading}>
                {loading ? "Criando..." : "Criar"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
