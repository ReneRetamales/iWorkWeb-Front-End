import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import axios from "axios";
import styles from "./BotonesRedes.module.css";
import Cookies from "js-cookie";

export default function BotonesRedes() {
  const [usuario, setUsuario] = useState(null);
  const token = Cookies.get("accessToken");

  useEffect(() => {
    if (token) {
      axios
        .get("https://api-iwork.onrender.com/auth/perfil", {
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
    }
  }, [token]);

  const handleWhatsAppClick = () => {
    if (usuario.nroTelefono) {
      const whatsappURL = `https://api.whatsapp.com/send?phone=569${usuario.nroTelefono}`;
      window.open(whatsappURL, "_blank");
    }
  };

  const handleGmailClick = () => {
    if (usuario && usuario.correo) {
      const asunto = encodeURIComponent("Contratacion de servicio mediante IWork");
      const mensaje = encodeURIComponent("Hola, estoy interesado/a en contratar tus servicios, por favor, hazme saber los detalles. Saludos!")
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${usuario.correo}&su=${asunto}&body=${mensaje}`;
      window.open(gmailLink,"_blank");
    }
  };

  return (
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
  );
}
