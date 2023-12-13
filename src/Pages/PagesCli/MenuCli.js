import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Rating } from "primereact/rating";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import BarraMenuCli from "../../components/BarraMenuCli";
import Footer from "../../components/Footer";
import styles from "./MenuCli.module.css";
import axios from "axios";
import { Chip } from "primereact/chip";
import { Helmet } from "react-helmet";
import logo from "../../Images/logo.png";

export const MenuCli = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [profesiones, setProfesiones] = useState([]);
  const [selectedProfesion, setSelectedProfesion] = useState(null);
  const [profesionElegida, setProfesionElegida] = useState([]);

  useEffect(() => {
    axios.get("https://api-iwork.onrender.com/profesion").then((response) => {
      setData(response.data);
      const opcionesProfesiones = response.data.map((item) => ({
        label: item.nombre_profesion,
        value: item.nombre_profesion,
      }));
      opcionesProfesiones.sort((a, b) => a.label.localeCompare(b.label));
      setProfesiones(opcionesProfesiones);
    });
  }, []);

  // eslint-disable-next-line no-unused-vars
  // El codigo de arriba es para desactivar los warning en caso de que eslint no realice bien la pega (solo haria falta borrar este comentario para que funcione)
  const filtrarProfesion = (profesion) => {
    setSelectedProfesion(profesion);
  };

  const limpiarFiltro = () => {
    setSelectedProfesion(null);
  };

  const redirigirPerfilProfesional = (idProfesional) => {
    navigate(`/perfil-profesional/${idProfesional}`);
  };

  useEffect(() => {
    if (data) {
      if (selectedProfesion) {
        const profesionalesFiltrados = data
          .filter((item) => item.nombre_profesion === selectedProfesion)
          .map((item) => {
            const profesional = item.profesionales && item.profesionales[0];
            const calificaciones =
              profesional && profesional.resena
                ? profesional.resena.map((resena) => resena.calificacion)
                : [];
            const promedioCalificaciones =
              calificaciones.length > 0
                ? calificaciones.reduce(
                    (total, calificacion) => total + calificacion,
                    0
                  ) / calificaciones.length
                : 0;

            return {
              nombre_profesion: item.nombre_profesion,
              profesional: {
                nombre: profesional ? profesional.nombre : "",
                apellido: profesional ? profesional.apellido : "",
                id: profesional ? profesional.id : null,
              },
              resena:
                profesional && profesional.resena ? profesional.resena : [],
              calificacion: promedioCalificaciones,
            };
          });
        setProfesionElegida(profesionalesFiltrados);
      } else {
        const profesionales = data
          .map((item) => {
            if (item.profesionales && item.profesionales.length > 0) {
              const profesional = item.profesionales[0];
              const calificaciones = profesional.resena.map(
                (resena) => resena.calificacion
              );
              const promedioCalificaciones =
                calificaciones.length > 0
                  ? calificaciones.reduce(
                      (total, calificacion) => total + calificacion,
                      0
                    ) / calificaciones.length
                  : 0;

              return {
                nombre_profesion: item.nombre_profesion,
                profesional: {
                  nombre: profesional ? profesional.nombre : "No asignado",
                  apellido: profesional ? profesional.apellido : "No asignado",
                  id: profesional ? profesional.id : null,
                },
                resena: profesional ? profesional.resena : [],
                calificacion: promedioCalificaciones,
              };
            }
            return null;
          })
          .filter(Boolean);

        setProfesionElegida(profesionales);
      }
    }
  }, [selectedProfesion, data]);

  // const mejoresProfesionales = [];
  // if (data) {
  //   const profesiones = data
  //     .map((item) => {
  //       if (item.profesionales && item.profesionales.length > 0) {
  //         return {
  //           nombre_profesion: item.nombre_profesion,
  //           profesional: {
  //             nombre: item.profesionales[0].nombre,
  //             apellido: item.profesionales[0].apellido,
  //             id: item.profesionales[0].id,
  //           },
  //           resena: item.profesionales[0].resena,
  //         };
  //       }
  //       return null;
  //     })
  //     .filter(Boolean);

  //   profesiones.forEach((profesion) => {
  //     const promedioCalificaciones = profesion.resena.reduce(
  //       (total, res) => total + res.calificacion,
  //       0
  //     );
  //     const promedio = promedioCalificaciones / profesion.resena.length;

  //     const mejorResena = profesion.resena.find(
  //       (res) => res.calificacion > promedio
  //     );

  //     if (mejorResena) {
  //       mejoresProfesionales.push({
  //         nombre_profesion: profesion.nombre_profesion,
  //         nombre_profesional: profesion.profesional.nombre,
  //         apellido_profesional: profesion.profesional.apellido,
  //         calificacion: mejorResena.calificacion,
  //         id: profesion.profesional.id,
  //       });
  //     }
  //   });
  // }

  return (
    <div className={styles.menuContainer}>
      <div className={styles.navMenu}>
        <BarraMenuCli />
      </div>

      <div className={styles.menuCliView}>
        <section className={styles.aboutSection}>
          <div className={styles.logoAbout}>
            <img
              src={logo}
              className={styles.logo}
              alt="iwork logo"
              draggable="false"
              loading="eager"
            />
          </div>

          <div className={styles.titles}>
            <div className={styles.textSection}>
              <div className={styles.titleSection}>
                <h3>Contratación</h3>
              </div>
              <p className={styles.parrafo}>
                Descubre a tus futuros colaboradores a través de perfiles
                detallados, con calificaciones, portafolios y certificaciones.
              </p>
            </div>

            <div className={styles.textSection}>
              <div className={styles.titleSection}>
                <h3>Ofrecimientos</h3>
              </div>
              <p className={styles.parrafo}>
                iWork no solo conecta, también genera oportunidades de empleo al
                destacar tu perfil en el mundo digital.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.cartasSection}>
          <div className={styles.filterSection}>
            <h3>Profesionales Mejor Calificados</h3>
            <div className={styles.filter}>
              <Button
                icon="pi pi-times"
                size="small"
                rounded
                // outlined
                severity="danger"
                onClick={limpiarFiltro}
                aria-label="Cancel"
              />
              <Dropdown
                value={selectedProfesion}
                options={profesiones}
                onChange={(e) => setSelectedProfesion(e.value)}
                placeholder="Filtrar por profesión"
              />
            </div>
          </div>

          <div>
            <Helmet>
              <script
                type="text/javascript"
                async
                defer
                src="https://cdn.survio.com/static/widgets/web-widget.js"
                data-backgroundColor="#88E2FF"
                data-color="#000000"
                data-text="Déjanos tu comentario"
                data-url="https://www.survio.com/survey/d/C2W7I7F7X3E6I1B4K"
              ></script>
            </Helmet>
          </div>

          <div className={styles.cartaContainer}>
            {profesionElegida.length === 0 ? (
              <div className={styles.cartaProfesional}>
                <span>Cargando profesionales...</span>
              </div>
            ) : (
              profesionElegida.map((profesional, index) => (
                <div
                  className={styles.cartaProfesional}
                  key={index}
                  onClick={() =>
                    redirigirPerfilProfesional(profesional.profesional.id)
                  }
                >
                  {profesional &&
                  profesional.profesional &&
                  profesional.profesional.nombre ? (
                    <div className={styles.cartaDatos}>
                      <span>{`${profesional.profesional.nombre} ${profesional.profesional.apellido}`}</span>

                      {profesional && profesional.calificacion ? (
                        <Rating
                          value={profesional.calificacion}
                          readOnly
                          cancel={false}
                        />
                      ) : null}

                      {profesional && profesional.nombre_profesion ? (
                        <div>
                          <Chip
                            key={index}
                            label={profesional.nombre_profesion}
                          />
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <div className={styles.divFooter}>
        <Footer />
      </div>
    </div>
  );
};
