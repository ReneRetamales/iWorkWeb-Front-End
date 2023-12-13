import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
// import { ConfirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import axios from "axios";
import styles from "./BotonesAdmin.module.css";
import Cookies from "js-cookie";

const BotonAdmin = () => {
  const [users, setUsers] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  // const [UserToDelete, setUserToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    axios.get("https://api-iwork.onrender.com/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUsers(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        // console.log("Error al traer los datos de usuarios", error);
      });
    axios.get("https://api-iwork.onrender.com/profesional", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setProfesionales(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // console.log("Error al traer los datos de profesionales", error);
      });
  }, []);

  // const confirmDelete = (user) => {
  //   setUserToDelete(user);
  //   setShowConfirm(true);
  // }
  // const rejectDelete = () => {
  //   setShowConfirm(false);
  // }

  const handleDeleteUser = (user) => {
    const token = Cookies.get("accessToken");
    const deleteEndpoint = user.tipoCuenta === "cliente" ? `https://api-iwork.onrender.com/users/${user.id}` : `https://api-iwork.onrender.com/profesional/${user.id}`;
    try {
      axios.delete(deleteEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((response) => {
          // console.log("Usuario eliminado con éxito", response.data);
          if (user.tipoCuenta === "cliente") {
            axios.get("https://api-iwork.onrender.com/users")
              .then((response) => {
                setUsers(response.data);
              })
              .catch((error) => {
                // console.log("Error al traer los datos de usuarios", error);
              });
          } else {
            axios.get("https://api-iwork.onrender.com/profesional")
              .then((response) => {
                setProfesionales(response.data);
              })
              .catch((error) => {
                // console.log("Error al traer los datos de profesionales", error);
              });
          }
          setShowConfirm(false);
          if (toast.current) {
            toast.current.show({
              severity: "success",
              summary: "Exito",
              detail: "Usuario eliminado con exito!"
            });
          }
        })
    } catch (error) {
      // console.log("Error al eliminar el usuario", error);
      setShowConfirm(false);
      if (toast.current) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Ocurrio un error al eliminar el usuario"
        });
      }
    }
  };

  return (
    <div className={styles.botonesAdminContainer}>
      <h5>Listado de usuarios</h5>
      <div className={styles.buscarBotonesAdmin}>
        <Button label="Usuario" icon="pi pi-search" />
        <InputText placeholder="Nombre de usuario" />
      </div>
      <div className={styles.listado}>
        <DataTable className={styles.tabla} paginator rows={5} value={[...users, ...profesionales]}>
          <Column field="nombre" header="Nombre" />
          <Column field="correo" header="Correo" />
          <Column field="tipoCuenta" header="Tipo de cuenta" />
          <Column
            body={(rowData) => (
              <Button
                icon="pi pi-times"
                className="p-button-danger"
                onClick={() => handleDeleteUser(rowData)}
                rounded
              />
            )}
          />
        </DataTable>
        {/* <ConfirmPopup
          visible={showConfirm}
          onHide={() => setShowConfirm(false)}
          message="¿Estas seguro de eliminar al usuario?, Esto eliminara todo lo relacionado a el usuario"
          header="Confirmar eliminacion"
          icon="pi pi-exclamation-triangle"
          accept={handleDeleteUser}
          reject={rejectDelete}
        /> */}
        <Toast ref={toast} />
      </div>
    </div>
  );
};
export default BotonAdmin;