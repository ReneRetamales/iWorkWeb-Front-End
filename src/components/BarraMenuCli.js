import { Link } from "react-router-dom";
import React, { useState } from "react";
import Busqueda from "./resultadoBusqueda";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import axios from "axios";
import styles from "./BarraMenuCli.module.css";
import Cookies from "js-cookie";

export default function BarraMenuCli() {
  const [searchQuery, setSearchQuery] = useState("");
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
        <Link to="/MenuCli" className={styles.link}>
          Muro
        </Link>
      ),
      icon: "pi pi-home",
    },
    {
      label: (
        <Link to="/PerfilCliente" className={styles.link}>
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
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <i className="pi pi-fw pi-power-off" style={{ fontWeight: 'bold', marginRight: '5px' }} />
          <span style={{ fontWeight: 'bold' }}>Cerrar Sesión</span>
        </Link>
      ),
    },
  ];

  const logo = (
    <img
      alt="logo"
      src="https://cdn-icons-png.flaticon.com/512/11107/11107584.png"
      height="40"
      className={styles.logo}
    ></img>
  );

  const MarcaCli = (
    <div style={{ display: "flex", alignItems: "center" }}>
      {logo}
      <span>iWork</span>
    </div>
  );

  const onSearch = (e) => {
    setSearchQuery(e.target.value);
    fetchResults(e.target.value);
  };

  const fetchResults = (query) => {
    const token = Cookies.get("accessToken");
    axios
      .get(`https://api-iwork.onrender.com/profesional/search?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setResultadosBusqueda(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const barra = (
    <div>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          placeholder="Buscar"
          value={searchQuery}
          onChange={onSearch}
        />
      </span>
    </div>
  );
  const onHide = () => {
    setShowModal(false);
  };

  return (
    <div>
      <ConfirmDialog />
      <Menubar model={menu} start={MarcaCli} end={barra} />
      <div className={styles.busqueda}>
        {resultadosBusqueda.length > 0 && (
          <Busqueda
            resultados={resultadosBusqueda}
            visible={showModal}
            onHide={onHide}
          />
        )}
      </div>
    </div>
  );
}
