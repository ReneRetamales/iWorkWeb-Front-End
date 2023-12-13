import React, { useEffect, useState, useRef } from "react";
import BarraMenuAdmin from "../../components/BarraMenuAdmin";
import BotonAdmin from "../../components/BotonesAdmin";
import Correo from "../../components/Correo";
import MensajeReclamo from "./MensajeReclamo";
import Grafico from "./Grafico";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import axios from "axios";
import styles from "./VistaAdmin.module.css";
import Cookies from "js-cookie";

const AdminView = () => {
  const [reclamos, setReclamos] = useState([]);
  const [profesiones, setProfesiones] = useState([]);
  const [nuevaProfesion, setNuevaProfesion] = useState("");
  const [resenaToDelete, setResenaToDelete] = useState(null);
  const [selectedReclamo, setSelectedReclamo] = useState(null);
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    axios.get("https://api-iwork.onrender.com/profesion")
      .then((response) => {
        setProfesiones(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        // console.log("Error al traer los datos", error);
      });

    axios.get("https://api-iwork.onrender.com/resena/all").then((response) => {
      const reclamos = response.data.filter(
        (resena) => resena.tipo === "reclamo"
      );
      setReclamos(reclamos);
      // console.log(reclamos);
    });
  }, []);

  const handleMensaje = (reclamo) => {
    setSelectedReclamo(reclamo);
    setMensajeVisible(true);
  };
  const onHide = () => {
    setMensajeVisible(false);
  };

  const confirmDelete = (resena) => {
    setResenaToDelete(resena);
    setShowConfirm(true);
  }

  const rejectDelete = () => {
    setShowConfirm(false);
  }

  const handleDeleteResena = () => {
    const token = Cookies.get("accessToken");
    const resenaId = resenaToDelete.resenaId;
    axios.delete(`https://api-iwork.onrender.com/resena/${resenaId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log("Mensaje eliminado:", response.data);
        const updateReclamos = reclamos.filter(
          (item) => item.resenaId !== resenaId
        );
        setReclamos(updateReclamos);
        setShowConfirm(false);
        if (toast.current) {
          toast.current.show({ 
            severity: "success", 
            summary: "Exito", 
            detail: "Reclamo eliminado con exito!" });
        }
      });
  };

  const handleAddProfesion = () => {
    const token = Cookies.get("accessToken");
    if (nuevaProfesion.trim() !== "") {
      axios.post("https://api-iwork.onrender.com/profesion", {
        nombre_profesion: nuevaProfesion,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        // console.log("Profesión agregada con éxito", response.data);
        axios
          .get("https://api-iwork.onrender.com/profesion")
          .then((response) => {
            setProfesiones(response.data);
            if (toast.current) {
              toast.current.show({ 
                severity: "success", 
                summary: "Exito", 
                detail: "Profesion Agregada con exito!" });
            }
          })
          .catch((error) => {
            // console.log("Error al traer los datos", error);
          });
      }).catch((error) => {
        console.error("Error al agregar la profesión", error);
      });
    }
  };

  const handleDeleteProfesion = (profesion) => {
    const token = Cookies.get("accessToken");
    const profesionId = profesion.id_profesion;
    try {
      axios.delete(`https://api-iwork.onrender.com/profesion/eliminar/${profesionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // console.log("profesion eliminada", response.data);
          const updateProfesiones = profesiones.filter(
            (item) => item.id_profesion !== profesionId
          );
          setProfesiones(updateProfesiones);
          // setShowProfesionConfirm(false);
          if (toast.current) {
            toast.current.show({ 
              severity: "success", 
              summary: "Exito", 
              detail: "Profesion eliminada" });
          }
        });
    } catch (error) {
      console.error("Error al eliminar la profesion", error);
    }
  };

  return (
    <div className={styles.vistaAdminContainer}>
      <div className={styles.navMenu}>
        <BarraMenuAdmin />
      </div>
      <div className={styles.vistaAdminData}>
        <div className={styles.vistaAdminContent1}>
          <div className={styles.listaUsuarios}>
            <BotonAdmin />
          </div>
          <div className={styles.adminBuscarMensajes}>
            <span>Gestor de mensajes:</span>
            <div className={styles.buscarMensajes}></div>
            <DataTable paginator rows={5} value={reclamos}>
              <Column field="tipo" header="Asunto" />
              <Column field="escritor.nombre" header="Cliente" />
              <Column field="escritor.correo" header="Correo Cliente" />
              <Column field="CreatedAt" header="Fecha" />
              <Column
                body={(reclamo) => (
                  <Button
                    label="Ver Reclamo"
                    onClick={() => handleMensaje(reclamo)}
                  />
                )}
              />
              <Column
                body={(rowData) => (
                  <Button
                    label="Eliminar"
                    onClick={() => confirmDelete(rowData)}
                  />
                )}
              />
            </DataTable>
            <ConfirmPopup
              visible={showConfirm}
              onHide={() => setShowConfirm(false)}
              message="¿Estas seguro de eliminar el reclamo?"
              header="Confirmar eliminacion"
              icon="pi pi-exclamation-triangle"
              accept={handleDeleteResena}
              reject={rejectDelete}
            />
            <Toast ref={toast}/>
          </div>
          <div className={styles.correoAdmin}>
            <Correo />
          </div>
        </div>

        <div className={styles.vistaAdminContent2}>
          <div className={styles.vistaAdminProfesion}>
            <h5>Profesiones</h5>
            <InputText
              placeholder="Ingresar nueva profesión"
              value={nuevaProfesion}
              onChange={(e) => setNuevaProfesion(e.target.value)}
            />
            <Button label="Agregar" onClick={handleAddProfesion} rounded />
            <DataTable paginator rows={5} value={profesiones}>
              <Column field="nombre_profesion" header="Profesiones" />
              <Column
                body={(rowData) => (
                  <Button
                    icon="pi pi-times"
                    className="p-button-danger"
                    onClick={() => handleDeleteProfesion(rowData)}
                    rounded
                  />
                )}
              />
            </DataTable>
            <Toast ref={toast}/>
          </div>
          <div className={styles.graficoAdmin}>
            <Grafico />
          </div>
        </div>
      </div>
      {mensajeVisible && selectedReclamo && (
        <MensajeReclamo
          visible={mensajeVisible}
          onHide={onHide}
          reclamoData={selectedReclamo}
        />
      )}
    </div>
  );
};

export default AdminView;
