import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { Chart } from "primereact/chart";
import styles from "./Grafico.module.css";

const Grafico = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [profesiones, setProfesiones] = useState([]);
  const [selectedProfesion, setSelectedProfesion] = useState(null);

  useEffect(() => {
    axios
      .get("https://api-iwork.onrender.com/profesion")
      .then((response) => {
        setProfesiones(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        // console.log("Error al traer los datos", error);
      });
  }, []);

  useEffect(() => {
    if (selectedProfesion) {
      const profesionales = selectedProfesion.profesionales;
      if (
        profesionales &&
        Array.isArray(profesionales) &&
        profesionales.length > 0
      ) {
        const data = {
          labels: profesionales.map(
            (profesional) => `${profesional.nombre} ${profesional.apellido}`
          ),
          datasets: [
            {
              label: "Calificación",
              data: profesionales.map((profesional) => {
                const resenas = profesional.resena;
                if (resenas && Array.isArray(resenas) && resenas.length > 0) {
                  const calificaciones = resenas.map(
                    (resena) => resena.calificacion
                  );
                  const sumCalificaciones = calificaciones.reduce((a, b) => a + b, 0);
                  const promedio = sumCalificaciones / calificaciones.length;
                  return promedio;
                } else {
                  return 0;
                }
              }),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 206, 86)",
                "rgb(75, 192, 192)",
                "rgb(153, 102, 255)",
              ],
              borderWidth: 1,
            },
          ],
        };
        const options = {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };

        setChartData(data);
        setChartOptions(options);
      } else {
        console.error(
          "La respuesta no tiene la estructura esperada:",
          selectedProfesion
        );
      }
    }
  }, [selectedProfesion]);

  return (
    <div className={styles.graficoContainer}>
      <h5>Gráfico</h5>
      <div className={styles.dropdownContainer}>
        <Dropdown
          value={selectedProfesion}
          onChange={(e) => setSelectedProfesion(e.value)}
          options={profesiones}
          optionLabel="nombre_profesion"
          placeholder="Seleccionar profesión"
        />
        {selectedProfesion && selectedProfesion.profesionales.length === 0 && (
          <p className={styles.message}>La profesion elegida no posee profesionales asociados.</p>
        )}
      </div>
      <div>
        {selectedProfesion && selectedProfesion.profesionales.length > 0 ? (
          <Chart type="bar" data={chartData} options={chartOptions} />
        ) : null}
      </div>
    </div>
  );
};

export default Grafico;
