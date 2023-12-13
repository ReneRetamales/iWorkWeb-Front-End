import { Link } from "react-router-dom";
import React from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Menubar } from "primereact/menubar";
import styles from "./BarraMenuPro.module.css";
import Cookies from "js-cookie";

const BarraMenuPro = () => {
  const cerrarSesion = () => {
    confirmDialog({
      message: "Estás a punto de cerrar sesión, ¿seguro que quieres salir?",
      header: "Cerrar Sesión",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Cerrar Sesión",
      rejectLabel: "No",
      accept: () => {
        Cookies.remove("accessToken");
        window.location.href = "/";
      },
    });
  };

  const menu = [
    {
      label: (
        <Link to="/PerfilProfesional" className={styles.link}>
          Mi Perfil
        </Link>
      ),
      icon: "pi pi-fw pi-user",
    },
    {
      label: (
        <Link to="/PreguntasFrecuentes" className={styles.link}>
          FAQ
        </Link>
      ),
      icon: "pi pi-info-circle",
    },
    {
      label: (
        <Link
          className={styles.linkLogout}
          onClick={cerrarSesion}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <i
            className="pi pi-fw pi-power-off"
            style={{ fontWeight: "bold", marginRight: "5px" }}
          />
          <span style={{ fontWeight: "bold" }}>Cerrar Sesión</span>
        </Link>
      ),
    },
  ];

  const logo = (
    <img
      alt="logo"
      src="https://cdn-icons-png.flaticon.com/512/2880/2880841.png"
      className={styles.logo}
    ></img>
  );

  const MarcaPro = (
    <div style={{ display: "flex", alignItems: "center" }}>
      {logo}
      <span>iWork Pro</span>
    </div>
  );

  return (
    <div>
      <ConfirmDialog />
      <Menubar model={menu} start={MarcaPro} />
    </div>
  );
};

export default BarraMenuPro;
