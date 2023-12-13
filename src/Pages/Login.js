import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useForm } from "react-hook-form";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Cookies from "js-cookie";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import logo from "../Images/logo.png";
import styles from "./Login.module.css";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorToast, setErrorToast] = useState(null);
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginMessage, setLoginMessage] = useState({ text: "", style: "" });
  const navigate = useNavigate();
  const mensaje = useRef(null);

  useEffect(() => {
    if (loginMessage.text) {
      mensaje.current.show({
        severity: loginMessage.severity,
        summary: loginMessage.text,
        life: 4000,
      });
    }
  }, [loginMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlesubmit = async () => {
    try {
      const response = await axios.post(
        "https://api-iwork.onrender.com/auth/login",
        {
          correo: formData.correo,
          contrasena: formData.contrasena,
        }
      );

      if (response.data.success) {
        Cookies.set("accessToken", response.data.data, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
        setLoginMessage({ text: "Inicio de Sesión exitoso", style: "success" });

        const token = response.data.data;
        const decodedToken = jwt_decode(token);
        const userType = decodedToken.role;

        if (userType === "cliente") {
          navigate("/PerfilCliente");
        } else if (userType === "profesional") {
          navigate("PerfilProfesional");
        } else if (userType === "admin") {
          navigate("/AdminView");
        }
      } else {
      }
    } catch (error) {
      console.error("Error en el inicio de sesion", error);
      setLoginMessage({
        text: "Correo o contraseña incorrectos",
        style: "error",
      });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLogo}>
        <img
          src={logo}
          className={styles.logo}
          alt="iwork logo"
          draggable="false"
          loading="eager"
        />
      </div>

      <div className={styles.loginData}>
        <form
          className={styles.loginForm}
          onSubmit={handleSubmit(handlesubmit)}
        >
          <InputText
            type="email"
            placeholder="Correo electrónico"
            name="correo"
            {...register("correo", { required: "Correo es requerido" })}
            value={formData.correo}
            onChange={handleInputChange}
          ></InputText>
          {errors.correo && (
            <span className={styles.error}>{errors.correo.message}</span>
          )}
          <div className={styles.loginContrasena}>
            <InputText
              className={styles.contrasena}
              placeholder="Contraseña"
              type={showPassword ? "text" : "password"}
              name="contrasena"
              {...register("contrasena", {
                required: "Constraseña es requerida",
              })}
              value={formData.contrasena}
              onChange={handleInputChange}
            ></InputText>
            <div
              className={styles.botonOcultar}
              type="text"
              severity="secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={showPassword ? "pi pi-eye-slash" : "pi pi-eye"}></i>
            </div>
          </div>

          {errors.contrasena && (
            <span className={styles.error}>{errors.contrasena.message}</span>
          )}
          <Link to="/MenuPro"></Link>
          <Toast ref={(el) => (mensaje.current = el)} />
          {errorToast && (
            <Toast
              severity={errorToast.severity}
              summary={errorToast.summary}
              detail={errorToast.detail}
              life={4000}
              onClose={() => setErrorToast(null)}
            />
          )}
          <Button
            className={styles.button}
            label="Iniciar sesión"
            type="submit"
            variant="contained"
            rounded
          />
        </form>
      </div>

      <div className={styles.createNewUser}>
        <p>¿No tienes una cuenta?</p>
        <Link className={styles.link} to="/Registro">
          <div className={styles.loginRegisterButton}>
            <Button
              className={styles.button}
              label="Crear cuenta"
              outlined
              rounded
            />
          </div>
        </Link>
      </div>
    </div>
  );
};
