import React, { useState } from "react";
import { Chip } from "primereact/chip";
import { useNavigate } from "react-router-dom";
import styles from "./resultadoBusqueda.module.css";

const Busqueda = ({ resultados }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  const redirigirPerfilProfesional = (idProfesional) => {
    navigate(`/perfil-profesional/${idProfesional}`);
  };

  const handleResultadoClick = (id) => {
    setVisible(false);
    redirigirPerfilProfesional(id);
  };

  return (
    <div className={styles.busqueda}>
      {visible &&
        resultados.map((resultado, index) => (
          <div
            key={index}
            className={styles.resultados}
            onClick={() => handleResultadoClick(resultado.id)}
          >
            <div className={styles.resultado}>
              <div className={styles.nombre}>
                <p>{resultado.nombre}</p> <p>{resultado.apellido}</p>{" "}
              </div>
              <div className={styles.chip}>
                {resultado.tipoProfesion.map((profesion, i) => (
                  <Chip
                    key={i}
                    label={profesion.nombre_profesion}
                    className="p-mr-2"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Busqueda;
