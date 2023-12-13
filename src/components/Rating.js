import React, { Component } from "react";

import { Rating } from "primereact/rating";

import styles from "./Ratting.module.css";

class Calificacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingValue: this.props.value || null, // Valor de la calificación proporcionado por el padre
    };
  }

  handleRatingChange = (e) => {
    this.setState({ ratingValue: e.value });
    this.props.onRateChange(e.value); // Pasa la calificación al componente padre
  };

  render() {
    const { readOnly, promedio } = this.props; // readOnly para el promedio y promedio como el valor promedio de la calificación

    return (
      <div className={styles.ratting}>
        <Rating
          value={this.state.ratingValue}
          onChange={this.handleRatingChange}
          cancel={false}
          readonly={readOnly} // Establece el modo de solo lectura
        />
        {readOnly && promedio && ( // Muestra el promedio si es modo de solo lectura y se proporciona un promedio
          <div className={styles.promedio}>
            Promedio de calificación: {promedio}
          </div>
        )}
      </div>
    );
  }
}

export default Calificacion;
