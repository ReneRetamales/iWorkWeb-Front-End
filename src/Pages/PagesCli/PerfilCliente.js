import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import BarraMenuCli from "../../components/BarraMenuCli";
import CalificacionPro from "../../components/RatingPro";
import Footer from "../../components/Footer";
import { Button } from "primereact/button";
import axios from "axios";
import styles from "./PerfilCliente.module.css";
import Cookies from "js-cookie";

const PerfilCliente = () => {
  const [usuario, setUsuario] = useState(null);
  const [resenas, setResenas] = useState(null);
  const [totalResenas, setTotalResenas] = useState(0);
  const resenasContainerRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      const decodedToken = parseJwt(token);
      const userId = decodedToken.id;
      axios.get("https://api-iwork.onrender.com/auth/perfil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setUsuario(response.data);
        })
        .catch((error) => {
          console.error("error al obtener los datos del usuario", error);
        });

      const fetchResenas = async () => {
        try {
          const resenasResponse = await axios.get(
            `https://api-iwork.onrender.com/resena/cliente/${userId}`
          );
          setResenas(resenasResponse.data);
          setTotalResenas(resenasResponse.data.length);
          // console.log(resenasResponse.data);
        } catch (error) {
          console.error("Error fetching resenas data:", error);
        }
      };
      fetchResenas();
    }
  }, []);

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  const itemTemplate = (data) => {
    return (
      <div className={styles.resenaBloque}>
        <div className={styles.resenaBloqueData}>
          <div className={styles.resenaBloqueUser}>
            <span className={styles.resenaNombre}>
              {data.dueno.nombre} {data.dueno.apellido}
            </span>
          </div>
          <CalificacionPro promedio={data.calificacion} />
        </div>
        <div className={styles.resenaBloqueComent}>
          <span className={styles.resenaComent}>{data.resena}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.perfilClienteContainer}>
      <div className={styles.navMenu}>
        <BarraMenuCli />
      </div>

      <div className={styles.vistaPerfilCliente}>
        {usuario && (
          <div>
            <h3>{usuario.nombre}</h3>
            <h4>{usuario.apellido}</h4>
          </div>
        )}
        <div className={styles.buttonContainer}>
          <Link to="/EditarPerfilCli">
            <Button
              className={styles.button}
              label="Editar Perfil"
              icon="pi pi-pencil"
              rounded
            />
          </Link>
        </div>
      </div>

      <div className={styles.vistaResena}>
        <div className={styles.dataResena}>
          <div>
            <h5>Historial de Reseñas</h5>
          </div>
          <div
            className={`${styles.dataResena} ${totalResenas > 10 ? styles.scrollableResenas : ""
              }`}
            ref={resenasContainerRef}
          >
            <div className={styles.resenas}>
              {resenas &&
                resenas.map((resena, index) => (
                  <span key={index}>{itemTemplate(resena)}</span>
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

export default PerfilCliente;
