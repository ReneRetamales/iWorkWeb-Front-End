import { Link } from "react-router-dom";
import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <div style={{ textAlign: "left" }}>
          <h5>Contacto</h5>
          <p>Nrtdevops@gmail.com</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <Link className={styles.link} to="/PreguntasFrecuentes">
            <h5>
              Preguntas Frecuentes{" "}
              <i className={`pi pi-link ${styles.redes}`}></i>
            </h5>
          </Link>
        </div>
        <div style={{ textAlign: "right" }}>
          <h5>Nuestras Redes</h5>
          <div className={styles.footerRedes}>
            <a
              href="[Enlace a Facebook]"
              style={{ color: "white", marginRight: "10px" }}
            >
              <i className={`pi pi-facebook ${styles.redes}`}></i>
            </a>
            <a
              href="[Enlace a Twitter]"
              style={{ color: "white", marginRight: "10px" }}
            >
              <i className={`pi pi-twitter ${styles.redes}`}></i>
            </a>
            <a
              href="[Enlace a Instagram]"
              style={{ color: "white", marginRight: "10px" }}
            >
              <i className={`pi pi-instagram ${styles.redes}`}></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
