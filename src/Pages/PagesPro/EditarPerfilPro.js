import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import styles from "./EditarPerfilPro.module.css";
import Cookies from "js-cookie";

export const EditarPerfilPro = () => {
  const [portafolio, SetPortafolio] = useState(null);
  const [selectedProfesion, setSelectedProfesion] = useState(null);
  const toast = useRef(null);
  const [imagen, setImages] = useState("");
  const [profesiones, setProfesiones] = useState([]);
  const token = Cookies.get("accessToken");
  const {
    setError,
    // formState: { errors },
  } = useForm();
  const [newData, setNewData] = useState({
    nombre: "",
    apellido: "",
    nroTelefono: "",
    contrasena: "",
    confirmarContrasena: "",
  });
  const [newPortafolio, setNewPortafolio] = useState({
    descripcion: "",
    certificaciones: "",
    imagen: "",
  });

  useEffect(() => {
    axios
      .get("https://api-iwork.onrender.com/profesion")
      .then((response) => {
        const profesionesOrdenadas = response.data.sort((a, b) =>
          a.nombre_profesion.localeCompare(b.nombre_profesion)
        );
        setProfesiones(profesionesOrdenadas);
        // console.log(response.data);
      })
      .catch((error) => {
        // console.log("Error al traer los datos", error);
      });
  }, []);

  useEffect(() => {
    const decodedToken = parseJwt(token);
    const userId = decodedToken.id;
    axios
      .get(`https://api-iwork.onrender.com/portafolio/profesional/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log("Datos del portafolio:", response.data);
        SetPortafolio(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del portafolio", error);
      });
  }, []);

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

  const handleGuardarCambios = (e) => {
    e.preventDefault();
    asignarProfesion();
    editarDatosPerfil(e);
    if (toast.current) {
      toast.current.show({
        severity: "success",
        summary: "Exito",
        detail: "Cambios del perfil guardados con exito",
      });
    }
  };

  const asignarProfesion = () => {
    if (selectedProfesion) {
      const idProfesion = selectedProfesion.id_profesion;
      axios
        .post(
          `https://api-iwork.onrender.com/profesional/asignar-profesion/${idProfesion}`,
          {
            id_profesion: idProfesion,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        )
        .then((response) => {
          // console.log(response.data);
        })
        .catch((error) => {
          console.error("Error al asignar la profesión", error);
          // console.log(error.response.data);
        });
    } else {
      console.error("No se ha seleccionado ninguna profesión.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };

  const handlePortafolioChange = (e) => {
    const { name, value } = e.target;
    setNewPortafolio({ ...newPortafolio, [name]: value });
  };

  const editarDatosPerfil = async (e) => {
    e.preventDefault();
    const decodedToken = parseJwt(token);
    const userId = decodedToken.id;
    const updateData = {};

    if (newData.nombre !== "") updateData.nombre = newData.nombre;
    if (newData.apellido !== "") updateData.apellido = newData.apellido;
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
        message: "las contraseñas no coinciden",
      });
      return;
    }

    try {
      const response = await axios.patch(
        `https://api-iwork.onrender.com/profesional/${userId}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      // console.log("datos editados correctamentes", response.data);
    } catch (error) {
      console.error("Error al editar los datos del perfil", error);
    }
  };

  const editarPortafolio = async (e) => {
    e.preventDefault();
    const idPortafolio = portafolio.data[0].id_portafolio;
    const updatePortafolio = {};

    if (newPortafolio.descripcion !== "")
      updatePortafolio.descripcion = newPortafolio.descripcion;
    if (newPortafolio.certificaciones !== "")
      updatePortafolio.certificaciones = newPortafolio.certificaciones;
    if (imagen) {
      updatePortafolio.imagen = imagen.split(",")[1];
    }

    try {
      const response = await axios.patch(
        `https://api-iwork.onrender.com/portafolio/${idPortafolio}`,
        updatePortafolio,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      // console.log("Portafolio editado correctamente", response.data);
      if (toast.current) {
        toast.current.show({
          severity: "success",
          summary: "Exito",
          detail: "Cambios del portafolio guardados con exito",
        });
      }
    } catch (error) {
      // console.error("Error al editar el portafolio", error);
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
    <div className={styles.editarPerfilProContainer}>
      <div className={styles.navMenu}>
        <Link to="/PerfilProfesional">
          <Button severity="secondary" text>
            <i
              className="pi pi-arrow-circle-left"
              style={{ fontSize: "1.75rem", color: "rgba(0, 0, 0, 0.5)" }}
            ></i>
          </Button>
        </Link>
        <span style={{ color: "#6C757D" }}>Editar perfil</span>
      </div>

      <div className={styles.contentEditar}>
        <div className={styles.editarData}>
          <h5>Editar Datos</h5>
          <div className={styles.editarProfesion}>
            <Dropdown
              value={selectedProfesion}
              onChange={(e) => setSelectedProfesion(e.value)}
              options={profesiones}
              optionLabel="nombre_profesion"
              placeholder="Seleccionar profesión"
              className="w-full md:w-14rem"
            />
          </div>
          <form
            onSubmit={(e) => {
              editarDatosPerfil(e);
            }}
          >
            <div className={styles.editarInputs}>
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
            <Link to="/PerfilProfesional">
              <Button
                className={styles.botonGuardar}
                label="Guardar cambios perfil"
                icon="pi pi-save"
                rounded
                onClick={handleGuardarCambios}
              />
            </Link>
          </div>
        </div>

        <div className={styles.editarPortafolio}>
          <h5>Editar Portafolio</h5>
          <form
            onSubmit={(e) => {
              editarPortafolio(e);
            }}
          >
            <div className={styles.contentEditarPortafolio}>
              <span>Descripción</span>
              <InputTextarea
                name="descripcion"
                value={newPortafolio.descripcion}
                onChange={handlePortafolioChange}
                className={styles.inputTextArea}
              />
            </div>
            <div className={styles.contentEditarPortafolio}>
              <span>Certificados</span>
              <InputTextarea
                name="certificaciones"
                value={newPortafolio.certificaciones}
                onChange={handlePortafolioChange}
                className={styles.inputTextArea}
              />
            </div>
            <div className={styles.agregarButtons}>
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
            </div>

            <div className={styles.agregarImagenes}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div className={styles.editarButton}>
                <Button
                  label="Guardar cambios portafolio"
                  icon="pi pi-image"
                  type="file"
                  accept="image/*"
                  rounded
                />
              </div>
            </div>
          </form>
        </div>
        <Toast ref={toast} />
      </div>
    </div>
  );
};
