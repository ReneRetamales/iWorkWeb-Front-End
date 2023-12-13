import React from "react";
import { Avatar } from "primereact/avatar";
import { Rating } from "primereact/rating";

import Carrusel from "../components/Carrusel";

export default function CartasMenu() {
  return (
    <div className="cartaMenu">
      <div className="cartaHeader">
        <div>
          <Avatar
            label="U"
            style={{ backgroundColor: "#9c27b0", color: "#ffffff" }}
            shape="circle"
          />
          <span>Nombre Apellido</span>
        </div>
        <div>
          <span>Profesión</span>
          <Rating value={4} readOnly cancel={false} />
        </div>
      </div>

      <div className="cartaCarrusel">
        <Carrusel />
      </div>
    </div>
  );
}
