import React from "react";
import { Carousel } from "primereact/carousel";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import styles from "./Carrusel.module.css";

const ImageCarousel = ({ images }) => {
  const itemTemplate = (image) => {
    return (
      <div className="p-grid p-nogutter">
        <div className="p-col">
          <img
            src={`data:image/jpeg;base64, ${image}`}
            alt="Imagen"
            className={styles.imagen}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.carruselContainer}>
      <Carousel
        value={images}
        itemTemplate={itemTemplate}
        numVisible={1}
        numScroll={1}
        circular={true}
      />
    </div>
  );
};

export default ImageCarousel;
