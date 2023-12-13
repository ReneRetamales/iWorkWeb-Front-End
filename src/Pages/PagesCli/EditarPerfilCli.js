import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import styles from "./EditarPerfilCli.module.css";
import Cookies from "js-cookie";

export const EditarPerfilCli = () => {
  const token = Cookies.get("accessToken");
  const navigate = useNavigate();
  const {
    setError,
    // formState: { errors },
  } = useForm();
  const [newData, setNewData] = React.useState({
    nroTelefono: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const handleGuardarCambios = (e) => {
    e.preventDefault();
    editarDatosPerfil(e);
    navigate("/PerfilCliente");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };
  const editarDatosPerfil = async (e) => {
    e.preventDefault();
    const decodedToken = parseJwt(token);
    const userId = decodedToken.id;
    const updateData = {};

    if (newData.nroTelefono !== "")
      updateData.nombnroTelefonore = newData.nonroTelefonombre;
    if (
      newData.contrasena !== "" &&
      newData.contrasena === newData.confirmarContrasena
    ) {
      updateData.contrasena = newData.contrasena;
      updateData.confirmarContrasena = newData.confirmarContrasena;
    } else if (
      newData.contrasena !== "" &&
      newData.contrasena !== newData.confirmarContrasena
    ) {
      setError("confirmarContrasena", {
        type: "manual",
        message: "Las contraseñas no coinciden.",
      });
      return;
    }
    try {
      const response = await axios.patch(
        `https://api-iwork.onrender.com/users/${userId}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      // console.log("Datos editados correctamente.", response.data);
    } catch (error) {
      console.error("Error al editar los datos del perfil.", error);
    }
  };
  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  return (
    <div className={styles.editarPerfilCliContainer}>
      <div className={styles.navMenu}>
        <Link to="/PerfilCliente">
          <Button severity="secondary" text>
            <i
              className="pi pi-arrow-circle-left"
              style={{ fontSize: "1.75rem", color: "rgba(0, 0, 0, 0.5)" }}
            ></i>
          </Button>
        </Link>
        <span style={{ color: "#6C757D" }}>Editar perfil</span>
      </div>

      <div className={styles.editarData}>
        <form
          onSubmit={(e) => {
            editarDatosPerfil(e);
          }}
        >
          <div className={styles.editarInputs}>
            <h5>Editar Datos</h5>
            <InputText
              onChange={handleInputChange}
              name="nroTelefono"
              value={newData.nroTelefono}
              placeholder="Cambiar teléfono"
              type="phone"
            ></InputText>
            <InputText
              onChange={handleInputChange}
              name="contrasena"
              value={newData.contrasena}
              placeholder="Nueva contraseña"
            ></InputText>
            <InputText
              onChange={handleInputChange}
              name="confirmarContrasena"
              value={newData.confirmarContrasena}
              placeholder="Verificar contraseña"
            ></InputText>
          </div>
        </form>
        <div className={styles.editarButton}>
          <Link to="/PerfilCliente">
            <Button
              className={styles.botonGuardar}
              onClick={handleGuardarCambios}
              label="Guardar cambios"
              icon="pi pi-save"
              rounded
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
