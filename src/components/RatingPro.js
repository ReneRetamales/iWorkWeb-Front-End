import React from "react";

import { Rating } from "primereact/rating";

const CalificacionPro = ({ promedio }) => {
  const roundedPromedio = promedio.toFixed(1);

  return (
    <div>
      <Rating value={promedio} stars={5} cancel={false} readOnly={true} />
      <span style={{ fontSize: "20px" }}>{roundedPromedio}</span>
    </div>
  );
};

export default CalificacionPro;
