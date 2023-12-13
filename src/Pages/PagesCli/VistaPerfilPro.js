import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import ImageCarousel from "../../components/Carrusel";
import BotonCalificacion from "../../components/AgregarCalificacion";
import Footer from "../../components/Footer";
import BarraMenuCli from "../../components/BarraMenuCli";
import CalificacionPro from "../../components/RatingPro";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import axios from "axios";
import styles from "./VistaPerfilPro.module.css";
import Cookies from "js-cookie";

const VistaPerfilPro = () => {
  const [profesionalData, setProfesionalData] = useState(null);
  const [portafolio, setPortafolio] = useState(null);
  const [promedioCalificacion, setPromedioCalificacion] = useState(0);
  const [resenas, setResenas] = useState(null);
  const [totalResenas, setTotalResenas] = useState(0);
  const { id } = useParams();
  const resenasContainerRef = useRef(null);

  useEffect(() => {
    const fetchProfesionalData = async () => {
      const token = Cookies.get("accessToken");
      try {
        const response = await axios.get(
          `https://api-iwork.onrender.com/profesional/id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfesionalData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchPortafolioData = async () => {
      const token = Cookies.get("accessToken");
      try {
        const portafolioResponse = await axios.get(
          `https://api-iwork.onrender.com/portafolio/profesional/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPortafolio(portafolioResponse.data);
        // console.log(portafolioResponse.data);
      } catch (error) {
        console.error("Error fetching portafolio data:", error);
      }
    };

    const fetchResenas = async () => {
      const token = Cookies.get("accessToken");
      try {
        const resenasResponse = await axios.get(
          `https://api-iwork.onrender.com/resena/profesional/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResenas(resenasResponse.data);
        setTotalResenas(resenasResponse.data.length);
        // console.log(resenasResponse.data);

        const sum = resenasResponse.data.reduce(
          (total, resena) => total + resena.calificacion,
          0
        );
        const promedio =
          resenasResponse.data.length > 0
            ? sum / resenasResponse.data.length
            : 0;
        setPromedioCalificacion(promedio);
      } catch (error) {
        console.error("Error fetching resenas data:", error);
      }
    };

    fetchProfesionalData();
    fetchPortafolioData();
    fetchResenas();
  }, [id]);


  const comentariosResenas = resenas ? resenas.filter(resena => resena.tipo === "comentario") : [];

  const handleWhatsAppClick = () => {
    if (profesionalData && profesionalData.nroTelefono) {
      const whatsappURL = `https://api.whatsapp.com/send?phone=569${profesionalData.nroTelefono}`;
      window.open(whatsappURL, "_blank");
    }
  };

  const handleGmailClick = () => {
    if (profesionalData && profesionalData.correo) {
      const asunto = encodeURIComponent("Contratacion de servicio mediante IWork");
      const mensaje = encodeURIComponent("Hola, estoy interesado/a en contratar tus servicios, por favor, hazme saber los detalles. Saludos!")
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${profesionalData.correo}&su=${asunto}&body=${mensaje}`;
      window.open(gmailLink, "_blank");
    }
  };

  return (
    <div className={styles.perfilProfesionalContainer}>
      <div className={styles.navMenu}>
        <BarraMenuCli />
      </div>

      <div className={styles.vistaPerfilProfesional}>
        <div className={styles.dataPerfilProfesional}>
          <div className={styles.headerPerfilProfesional}>
            {profesionalData && (
              <h4 className={styles.headerNombre}>
                {profesionalData.nombre} {profesionalData.apellido}
              </h4>
            )}
            <CalificacionPro promedio={promedioCalificacion} />
          </div>

          <div className={styles.descriptionPerfilProfesional}>
            {profesionalData && (
              <div>
                <div>
                  <h5>Profesiones</h5>
                  {profesionalData.tipoProfesion &&
                    profesionalData.tipoProfesion.length > 0 ? (
                    <ul className={styles.profesionChips}>
                      {profesionalData.tipoProfesion.map((profesion, index) => (
                        <Chip
                          key={index}
                          label={profesion.nombre_profesion}
                          className={styles.chip}
                        />
                      ))}
                    </ul>
                  ) : (
                    <p>Aún no se han asignado profesiones</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className={styles.contactoPerfilProfesional}>
            <h5>Contacto</h5>
            <div className={styles.botonesRedes}>
              <Button
                className={styles.botonRed}
                icon="pi pi-envelope"
                label="Gmail"
                severity="danger"
                onClick={handleGmailClick}
                rounded
              />
              <Button
                className={styles.botonRed}
                icon="pi pi-whatsapp"
                label="WhatsApp"
                severity="success"
                onClick={handleWhatsAppClick}
                rounded
              />
            </div>
          </div>

          <div className={styles.botonesEditarAgregar}>
            <BotonCalificacion profesionalId={id} />
          </div>
        </div>

        <div className={styles.portafolioProfesional}>
          <ImageCarousel
            images={
              portafolio && portafolio.data ? [portafolio.data[0].imagen] : []
            }
          />
        </div>
      </div>

      <div className={styles.vistaInfoResena}>
        <div className={styles.dataInfo}>
          <div className={styles.infoBloque}>
            <div>
              <h5>Descripción</h5>
            </div>
            <div>
              <span>
                {portafolio && portafolio.data && portafolio.data[0].descripcion
                  ? portafolio.data[0].descripcion
                  : "Cargando..."}
              </span>
            </div>
          </div>
          <div className={styles.infoBloque}>
            <div>
              <h5>Certificados</h5>
            </div>
            <div>
              <span>
                {portafolio &&
                  portafolio.data &&
                  portafolio.data[0].certificaciones
                  ? portafolio.data[0].certificaciones
                  : "Cargando..."}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.dataResena}>
          <div>
            <h5>Reseñas</h5>
          </div>
          <div
            className={`${styles.dataResena} ${totalResenas > 10 ? styles.scrollableResenas : ""
              }`}
            ref={resenasContainerRef}
          >
            <div className={styles.resenas}>
              {comentariosResenas &&
                comentariosResenas.map((resena, index) => (
                  <span key={index} className={styles.resenaBloque}>
                    <div className={styles.resenaBloqueData}>
                      <div className={styles.resenaBloqueUser}>
                        <span className={styles.resenaNombre}>
                          {resena.nombreUsuario}
                        </span>
                      </div>
                      <CalificacionPro promedio={resena.calificacion} />
                    </div>
                    <div className={styles.resenaBloqueComent}>
                      <span className={styles.resenaComent}>
                        {resena.resena}
                      </span>
                    </div>
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.divFooter}>
        <Footer />
      </div>
    </div>
  );
};

export default VistaPerfilPro;
