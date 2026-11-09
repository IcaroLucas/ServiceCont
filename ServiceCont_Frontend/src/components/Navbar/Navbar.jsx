import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { FiUser } from "react-icons/fi";
import { getUser, clearSession } from "../../utils/auth";
import styles from "./Navbar.module.css";

const PROFILE_PATH = "/Perfil";

const MENUS = [
  {
    key: "Maintenance",
    label: "MANUTENÇÃO",
    basePath: "/Maintenance",
    links: [
      { to: "/Maintenance/Entrada", label: "Entrada" },
      { to: "/Maintenance/Consulta", label: "Consulta" },
      { to: "/Maintenance/Devolucao", label: "Devolução" },
    ],
  },
  {
    key: "Inventory",
    label: "ALMOXARIFADO",
    basePath: "/Inventory",
    links: [
      { to: "/Inventory/Cadastro", label: "Cadastro" },
      { to: "/Inventory/Consulta", label: "Consulta" },
    ],
  },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (key) => setOpenMenu(openMenu === key ? null : key);
  const closeMenu = () => setOpenMenu(null);

  const handleLogout = () => {
    clearSession();
    navigate("/");
  };

  const isProfileActive = location.pathname === PROFILE_PATH;

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {MENUS.map((menu) => {
          const isOpen = openMenu === menu.key;
          const isRouteActive = location.pathname.startsWith(menu.basePath);

          return (
            <li key={menu.key} className={styles.menu}>
              <button
                type="button"
                className={`${styles.item} ${isOpen ? styles.itemActive : ""} ${isRouteActive ? styles.routeActive : ""}`}
                onClick={() => toggleMenu(menu.key)}
              >
                {menu.label}
              </button>

              {isOpen && (
                <ul className={styles.dropdown}>
                  {menu.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        onClick={closeMenu}
                        className={location.pathname === link.to ? styles.linkActive : styles.link}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}

        <li className={styles.menu}>
          <button
            type="button"
            className={`${styles.profileBtn} ${openMenu === "Profile" || isProfileActive ? styles.profileBtnActive : ""}`}
            onClick={() => toggleMenu("Profile")}
          >
            <FiUser />
          </button>

          {openMenu === "Profile" && (
            <ul className={`${styles.dropdown} ${styles.profileDropdown}`}>
              {user?.name && <li className={styles.profileName}>{user.name}</li>}
              <li>
                <Link
                  to={PROFILE_PATH}
                  onClick={closeMenu}
                  className={isProfileActive ? styles.linkActive : styles.link}
                >
                  Editar
                </Link>
              </li>
              <li>
                <button type="button" className={styles.link} onClick={handleLogout}>
                  Sair
                </button>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
