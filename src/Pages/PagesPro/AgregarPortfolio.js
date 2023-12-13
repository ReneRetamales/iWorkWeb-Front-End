import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from 'primereact/toast';
import axios from "axios";
import styles from "./AgregarPortfolio.module.css";
import Cookies from "js-cookie";

const AgregarPortfolio = () => {
  const [imagen, setImages] = useState("");
  const [descripcion, setDescription] = useState("");
  const [certificaciones, setCertificates] = useState("");
  const toast = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64Image = event.target.result;
      setImages(base64Image);
    };

    reader.onerror = (error) => {
      console.error("Error al leer el archivo:", error);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const requestData = {
      descripcion,
      certificaciones,
      imagen: imagen.split(",")[1],
    };

    try {
      const response = await axios.post(
        "https://api-iwork.onrender.com/portafolio/upload",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      if (response.data.success) {
        if (toast.current) {
          toast.current.show({ severity: "success", summary: "Exito", detail: "Portafolio agregado con exito!" })
        }
        setTimeout(() => {
          window.location.href = "/PerfilProfesional";
        }, 2000);
      } else {
        if (toast.current) {
          toast.current.show({ severity: "error", summary: "Error", detail: "Error al querer crear el portafolio" })
        }
        console.error(
          "Hubo un error al guardar el portafolio en la base de datos"
        );
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor", error);
    }
  };

  return (
    <div className={styles.agregarPortafolioContainer}>
      <div className={styles.navMenu}>
        <Link to="/PerfilProfesional">
          <Button severity="secondary" text>
            <i
              className="pi pi-arrow-circle-left"
              style={{ fontSize: "1.75rem", color: "rgba(0, 0, 0, 0.5)" }}
            ></i>
          </Button>
        </Link>
        <span style={{ color: "#6C757D" }}>Agregar portafolio</span>
      </div>

      <div className={styles.agregarCarta}>
        <div className={styles.agregarData}>
          <h5>Agregar Información</h5>
          <div className={styles.agregarInputs}>
            <span>Descripción</span>
            <InputTextarea
              className={styles.inputTextArea}
              value={descripcion}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.agregarInputs}>
            <span>Certificados</span>
            <InputTextarea
              className={styles.inputTextArea}
              value={certificaciones}
              onChange={(e) => setCertificates(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.agregarButtons}>
          <h5>Agregar Imágenes</h5>
          <div>
            {imagen && (
              <div className={styles.agregarImagenes}>
                <span>Imágenes seleccionadas:</span>
                <img
                  src={imagen}
                  alt={`Imagen seleccionada`}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    marginRight: "10px",
                  }}
                />
              </div>
            )}
          </div>
          <div className={styles.agregarImagenes}>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          <Button
            label="Añadir imágenes"
            icon="pi pi-image"
            type="file"
            accept="image/*"
            rounded
            outlined
            onChange={handleImageUpload}
          />
        </div>
      </div>
      <div className={styles.agregarGuardarBoton}>
        <Button
          label="Guardar cambios"
          icon="pi pi-save"
          rounded
          onClick={handleSave}
        />
      </div>
      <Toast ref={toast} />
    </div>
  );
};

export default AgregarPortfolio;
