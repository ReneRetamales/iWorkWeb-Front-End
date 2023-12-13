import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import BotonTerminos from "../components/BotonRegistro";
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { Message } from "primereact/message";
import { useForm } from "react-hook-form";
import { Toast } from 'primereact/toast';
import axios from "axios";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import styles from "./Registro.module.css";

export const Registro = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const toast = useRef(null);
  const {
    register,
    formState: { errors },
    setValue,
    setError,
  } = useForm();
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    nombre: "",
    apellido: "",
    nroTelefono: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
    tipoCuenta: "",
  });

  const handleCheckboxChange = (e) => {
    setAcceptTerms(e.checked);
    setButtonDisabled(!e.checked);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target || e;
    if (name === "nroTelefono") {
      if (isNaN(value) || value.includes('.') || value.includes('-') || value.includes('+')) {
        setError("nroTelefono", {
          type: "manual",
          message: "Este campo solo acepta numeros"
        });
        return;
      } else if (name === "nroTelefono" && value.length === 8) {
        setError("nroTelefono", null);
      }
    }
    setformData({ ...formData, [name]: value });
  };
  

  const whiteSpace = (value) => {
    return value.trim().length === 0;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    //validaciones del form
    if (whiteSpace(formData.nombre) ||
      whiteSpace(formData.apellido) ||
      whiteSpace(formData.correo) ||
      whiteSpace(formData.nroTelefono) ||
      whiteSpace(formData.contrasena) ||
      whiteSpace(formData.confirmarContrasena) ||
      whiteSpace(formData.tipoCuenta)) {
      if (toast.current) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No se puede ingresar espacios en blanco en los campos"
        })
        return;
      }
    }

    if (!acceptTerms) {
      console.log("debes aceptar los terminos y condiciones para registrarse");
      setError("acceptTerms", {
        type: "manual",
        message: "Debe aceptar los terminos y condiciones para registrarse"
      })
    }

    if (formData.contrasena !== formData.confirmarContrasena) {
      setError("confirmarContrasena", {
        type: "manual",
        message: "Las contraseñas no coinciden",
      });
      return;
    }

    if (formData.nroTelefono && formData.nroTelefono.length !== 8) {
      setError("nroTelefono", {
        type: "manual",
        message: "El número de teléfono debe tener 8 dígitos",
      });
      return;
    }


    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
    );
    if (!strongRegex.test(formData.contrasena)) {
      setError("contrasena", {
        type: "manual",
        message:
          "La contraseña debe contener al menos 8 carácteres, una mayúscula y un número.",
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://api-iwork.onrender.com/auth/register",
        {
          nombre: formData.nombre,
          apellido: formData.apellido,
          nroTelefono: formData.nroTelefono,
          correo: formData.correo,
          contrasena: formData.contrasena,
          tipoCuenta: formData.tipoCuenta,
        }
      );
      if (response.data.success) {
        console.log("Registro exitoso :D");
        console.log(response.data);
        if (toast.current) {
          toast.current.show({
            severity: "success",
            summary: "Excelente",
            detail: "Se a registrado con exito"
          })
        }
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        // console.log("Registro fallido");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log("Solicitud incorrecta: Verifica los datos ingresados");
        if (toast.current) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Ha ocurrido un error o el correo ya existe :C"
          })
        }
      } else {
        // console.log("error en el registro", error);
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.navMenu}>
        <Link to="/">
          <Button severity="secondary" text>
            <i
              className="pi pi-arrow-circle-left"
              style={{ fontSize: "1.75rem", color: "rgba(0, 0, 0, 0.5)" }}
            ></i>
          </Button>
        </Link>
        <span style={{ color: "#6C757D" }}>Crear cuenta</span>
      </div>

      <div className={styles.registerData}>
        <form
          className={styles.registerForm}
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit(e);
          }}
        >
          <div className={styles.registerInputs}>
            <div className={styles.registerName}>
              <InputText
                placeholder="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              ></InputText>
              <InputText
                placeholder="Apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
              ></InputText>
            </div>

            <div className={styles.registerNum}>
              <div className={styles.numberPhone}>
                <span className={styles.number}>+56 9</span>
                {/* <InputNumber
                  useGrouping={false}
                  className={styles.inputPhone}
                  placeholder="Numero de Teléfono"
                  name="nroTelefono"
                  value={formData.nroTelefono}
                  onChange={handleInputChange}
                  maxLength={8}
                ></InputNumber> */}
                <InputText
                  className={styles.inputPhone}
                  placeholder="Numero de Teléfono"
                  name="nroTelefono"
                  value={formData.nroTelefono}
                  onChange={handleInputChange}
                  maxLength={8}
                ></InputText>
              </div>
              {errors.nroTelefono && <span className={styles.errorMessage}>{errors.nroTelefono.message}</span>}
            </div>

            <div className={styles.registerEmailPass}>
              <InputText
                placeholder="Correo electrónico"
                name="correo"
                value={formData.correo}
                {...register("correo", { required: true })}
                onChange={handleInputChange}
              ></InputText>
              {errors.correo && <span className={styles.errorMessage}>Correo es requerido</span>}
              <div className={styles.registerContrasena}>
                <InputText
                  className={styles.contrasena}
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleInputChange}
                ></InputText>
                <div
                  className={styles.botonOcultar}
                  type="text"
                  severity="secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={showPassword ? "pi pi-eye-slash" : "pi pi-eye"}
                  ></i>
                </div>
                {/* <Button
                  severity="secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  outlined
                >
                  <span
                    className={showPassword ? "pi pi-eye-slash" : "pi pi-eye"}
                  ></span>
                </Button> */}
              </div>
              <div className={styles.registerContrasena}>
                <InputText
                  className={styles.contrasena}
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="Verificar contraseña"
                  name="confirmarContrasena"
                  value={formData.confirmarContrasena}
                  onChange={handleInputChange}
                ></InputText>
                <div
                  className={styles.botonOcultar}
                  type="text"
                  severity="secondary"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                >
                  <i
                    className={
                      showPasswordConfirm ? "pi pi-eye-slash" : "pi pi-eye"
                    }
                  ></i>
                </div>
              </div>
              {errors.confirmarContrasena && (
                <span className={styles.errorMessage}>{errors.confirmarContrasena.message}</span>
              )}
              {errors.contrasena && (
                // <Message
                //   className={styles.error}
                //   severity="error"
                //   text={errors.contrasena.message}
                // ></Message>
                <span className={styles.errorMessage}>{errors.contrasena.message}</span>
              )}
            </div>
          </div>

          <div className={styles.registerSelectContainer}>
            <div className={styles.registerTypeProfile}>
              <p>Selecciona el tipo de cuenta:</p>
              <div>
                <SelectButton
                  options={[
                    { label: "Cliente", value: "cliente" },
                    { label: "Profesional", value: "profesional" },
                  ]}
                  value={formData.tipoCuenta}
                  onChange={(e) =>
                    setformData({ ...formData, tipoCuenta: e.value })
                  }
                />
              </div>
            </div>

            <div>
              <BotonTerminos />
            </div>

            <div className={styles.checkBox}>
              <Checkbox
              className={styles.box}
                onChange={handleCheckboxChange}
                checked={acceptTerms}
              />
              <span>Acepto los términos y condiciones</span>
            </div>
            {errors.acceptTerms && (
              <span className={styles.errorMessage}>{errors.acceptTerms.message}</span>
            )}

            <div className={styles.registerButton}>
              <Button label="Registrarse" type="submit" rounded disabled={buttonDisabled}></Button>
            </div>
            <Toast ref={toast} />
          </div>
        </form>
      </div>
    </div>
  );
};
