import React, { useState } from "react";
import { SelectButton } from "primereact/selectbutton";

const SwitchButton = ({ onUserTypeChange }) => {
  const [selectedOption, setSelectedOption] = useState("cliente");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onUserTypeChange(option); // Actualiza el estado en el componente Login
  };

  const options = [
    { label: "Cliente", value: "cliente" },
    { label: "Profesional", value: "profesional" },
  ];

  return (
    <div>
      <SelectButton
        value={selectedOption}
        options={options}
        onChange={(e) => handleOptionChange(e.value)}
      />
    </div>
  );
};

export default SwitchButton;
