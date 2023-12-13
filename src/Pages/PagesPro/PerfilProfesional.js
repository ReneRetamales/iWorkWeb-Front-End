import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import BarraMenuPro from "../../components/BarraMenuPro";
import ImageCarousel from "../../components/Carrusel";
import CalificacionPro from "../../components/RatingPro";
import BotonesRedes from "../../components/BotonesRedes";
import BotonCalificacion from "../../components/AgregarCalificacion";
import Footer from "../../components/Footer";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import axios from "axios";
import styles from "./PerfilProfesional.module.css";
import Cookies from "js-cookie";
import { Helmet } from 'react-helmet';

export const PerfilPro = () => {
  const [portafolio, setPortafolio] = useState(null);
  const [profesionalData, setProfesionalData] = useState(null);
  const [promedioCalificacion, setPromedioCalificacion] = useState(0);
  const [resenas, setResenas] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [totalResenas, setTotalResenas] = useState(0);
  const toast = useRef(null);
  const resenasContainerRef = useRef(null);
  const [showConfirmDialog, setConfirmDialog] = useState(false);
  const [profesionToDelete, setProfesionToDelete] = useState(null);
  const [showButonPortafolio, setShowButonPortafolio] = useState(false);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      const decodedToken = parseJwt(token);
      setUserRole(decodedToken.role);

      if (decodedToken.role === "profesional") {
        axios.get("https://api-iwork.onrender.com/auth/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            setProfesionalData(response.data);
          })
          .catch((error) => {
            console.error("error al obtener los datos del usuario", error);
          });

        const userId = decodedToken.id;
        axios.get(`https://api-iwork.onrender.com/portafolio/profesional/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((response) => {
            setPortafolio(response.data);
            setShowButonPortafolio(response.data.success === false);
            if (response.data.success === false) {
              toast.current.show({ severity: "info", summary: "Portafolio", detail: "Parece que aun no agregas tu portafolio." })
            }
          })
          .catch((error) => {
            console.error("Error al obtener los datos del portafolio", error);
          });

        const fetchResenas = async () => {
          const token = Cookies.get("accessToken");
          try {
            const resenasResponse = await axios.get(
              `https://api-iwork.onrender.com/resena/profesional/${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setResenas(resenasResponse.data);
            setTotalResenas(resenasResponse.data.length);
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
          }
        };
        fetchResenas();
      }
    }
  }, []);

  const comentariosResenas = resenas ? resenas.filter(resena => resena.tipo === "comentario") : [];

  const deleteProfesion = (id_profesion) => {
    setProfesionToDelete(id_profesion)
    setConfirmDialog(true);
  }

  const onConfirm = (id_profesion) => {
    const token = Cookies.get("accessToken");
    if (profesionToDelete) {
      axios.patch(`https://api-iwork.onrender.com/profesional/eliminar-profesion/${id_profesion}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        // console.log(response.data);
        window.location.reload(true);
      })
        .catch((error) => {
          // console.error("error al eliminar la profesion", error);
        });
    }
    setConfirmDialog(false);
  };

  const onHide = () => {
    setConfirmDialog(false);
  }

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  return (
    <div className={styles.perfilProfesionalContainer}>
      <div className={styles.navMenu}>
        <BarraMenuPro />
      </div>

      <div>
        <Helmet>
          <script type="text/javascript" async defer src="https://cdn.survio.com/static/widgets/web-widget.js" data-backgroundColor="#88E2FF" data-color="#000000" data-text="Dejanos tu comentario" data-url="https://www.survio.com/survey/d/H7G6V4W8S1X1C9W5F"></script>
        </Helmet>
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
                    <div className={styles.profesionChips}>
                      {profesionalData.tipoProfesion.map((profesion, index) => (
                        <div className={styles.chip}>
                          <Chip
                            key={index}
                            label={profesion.nombre_profesion}
                            className="p-mr-2"
                            separator=","
                          />
                          <svg
                            onClick={() =>
                              deleteProfesion(profesion.id_profesion)
                            }
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            data-pc-section="removetokenicon"
                            className={styles.eliminar}
                          >
                            <g clip-path="url(#pr_icon_clip_5)">
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7 14C5.61553 14 4.26215 13.5895 3.11101 12.8203C1.95987 12.0511 1.06266 10.9579 0.532846 9.67879C0.00303296 8.3997 -0.13559 6.99224 0.134506 5.63437C0.404603 4.2765 1.07129 3.02922 2.05026 2.05026C3.02922 1.07129 4.2765 0.404603 5.63437 0.134506C6.99224 -0.13559 8.3997 0.00303296 9.67879 0.532846C10.9579 1.06266 12.0511 1.95987 12.8203 3.11101C13.5895 4.26215 14 5.61553 14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14ZM7 1.16667C5.84628 1.16667 4.71846 1.50879 3.75918 2.14976C2.79989 2.79074 2.05222 3.70178 1.61071 4.76768C1.16919 5.83358 1.05367 7.00647 1.27876 8.13803C1.50384 9.26958 2.05941 10.309 2.87521 11.1248C3.69102 11.9406 4.73042 12.4962 5.86198 12.7212C6.99353 12.9463 8.16642 12.8308 9.23232 12.3893C10.2982 11.9478 11.2093 11.2001 11.8502 10.2408C12.4912 9.28154 12.8333 8.15373 12.8333 7C12.8333 5.45291 12.2188 3.96918 11.1248 2.87521C10.0308 1.78125 8.5471 1.16667 7 1.16667ZM4.66662 9.91668C4.58998 9.91704 4.51404 9.90209 4.44325 9.87271C4.37246 9.84333 4.30826 9.8001 4.2544 9.74557C4.14516 9.6362 4.0838 9.48793 4.0838 9.33335C4.0838 9.17876 4.14516 9.0305 4.2544 8.92113L6.17553 7L4.25443 5.07891C4.15139 4.96832 4.09529 4.82207 4.09796 4.67094C4.10063 4.51982 4.16185 4.37563 4.26872 4.26876C4.3756 4.16188 4.51979 4.10066 4.67091 4.09799C4.82204 4.09532 4.96829 4.15142 5.07887 4.25446L6.99997 6.17556L8.92106 4.25446C9.03164 4.15142 9.1779 4.09532 9.32903 4.09799C9.48015 4.10066 9.62434 4.16188 9.73121 4.26876C9.83809 4.37563 9.89931 4.51982 9.90198 4.67094C9.90464 4.82207 9.84855 4.96832 9.74551 5.07891L7.82441 7L9.74554 8.92113C9.85478 9.0305 9.91614 9.17876 9.91614 9.33335C9.91614 9.48793 9.85478 9.6362 9.74554 9.74557C9.69168 9.8001 9.62748 9.84333 9.55669 9.87271C9.4859 9.90209 9.40996 9.91704 9.33332 9.91668C9.25668 9.91704 9.18073 9.90209 9.10995 9.87271C9.03916 9.84333 8.97495 9.8001 8.9211 9.74557L6.99997 7.82444L5.07884 9.74557C5.02499 9.8001 4.96078 9.84333 4.88999 9.87271C4.81921 9.90209 4.74326 9.91704 4.66662 9.91668Z"
                                fill="currentColor"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="pr_icon_clip_5">
                                <rect
                                  width="14"
                                  height="14"
                                  fill="white"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      ))}
                      <ConfirmDialog
                        visible={showConfirmDialog}
                        onHide={onHide}
                        message="¿Estas seguro que deseas quitarte esta profesion?"
                        header="Confirmacion"
                        icon="pi pi-exclamation-triangle"
                        accept={() => onConfirm(profesionToDelete)}
                        reject={onHide}
                      />
                    </div>
                  ) : (
                    <p>Aún no se han asignado profesiones</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className={styles.contactoPerfilProfesional}>
            <h5>Contacto</h5>
            <BotonesRedes />
          </div>

          <div className={styles.botonesEditarAgregar}>
            {userRole === "profesional" && (
              <Link to="/EditarPerfilPro">
                <Button
                  className={styles.botonesPerfilProfesional}
                  label="Editar Perfil"
                  icon="pi pi-pencil"
                  rounded
                  outlined
                />
              </Link>
            )}
            {userRole === "profesional" && portafolio && showButonPortafolio && (
              <Link to="/AgregarPortfolio">
                <Button
                  className={styles.botonesPerfilProfesional}
                  icon="pi pi-plus"
                  label="Agregar Portafolio"
                  rounded
                />
              </Link>
            )}
            {userRole === "cliente" && <BotonCalificacion />}
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
          <Toast ref={toast} />
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
