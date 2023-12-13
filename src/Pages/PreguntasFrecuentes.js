import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Dialog } from "primereact/dialog";
import styles from "./PreguntasFrecuentes.module.css";

export const PreguntasFrecuentes = () => {
  const [visible, setVisible] = useState(false);
  // const handleAccept = () => {
  //   setVisible(false);
  // };
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.preguntasFrecuentesContainer}>
      <div className={styles.navMenu}>
        <Button onClick={handleGoBack} severity="secondary" text>
          <i
            className="pi pi-arrow-circle-left"
            style={{ fontSize: "1.75rem", color: "rgba(0, 0, 0, 0.5)" }}
          ></i>
        </Button>
        <span style={{ color: "#6C757D" }}>Preguntas frecuentes</span>
      </div>

      <div className={styles.preguntasLista}>
        <h5>Preguntas Frecuentes</h5>
        <p className={styles.parrafo}>
          Aquí podrás encontrar alguna de las preguntas frecuentes o FAQ que
          iWork ha documentado para una mejor experiencia de usuario y
          transparencia con el mismo. Las preguntas frecuentes serán
          actualizadas a medida que los usuarios se vean con la necesidad de
          solventar dudas acerca del uso del servicio.
        </p>
        <Accordion activeIndex={0}>
          <AccordionTab header="01. Acerca del manual de uso">
            <p className={styles.parrafo}>
              Para que entiendas el funcionamiento de nuestros servicio
              disponemos del manual de uso de usuario en los siguientes enlaces
              descargables.
            </p>
            <p className={styles.parrafo}>
              Descargar:&nbsp;
              <a href="ruta/al/archivo.pdf" download>
                Manual de usuario cliente
              </a>
              .
            </p>
            <p className={styles.parrafo}>
              Descargar:&nbsp;
              <a href="ruta/al/archivo.pdf" download>
                Manual de usuario profesional
              </a>
              .
            </p>
          </AccordionTab>
          <AccordionTab header="02. Acerca de denuncias o reclamos">
            <p className={styles.parrafo}>
              Si un usuario profesional ha faltado a alguno de los puntos
              mencionados en las condiciones de uso del servicio:
            </p>
            <p className={styles.parrafo}>
              1.- Dirígete al perfil del usuario profesional que deseas
              denunciar.
            </p>
            <p className={styles.parrafo}>
              2.- Presiona el botón "Dejar calificación" y en la ventana
              emergente selecciona el tipo de reseña "reclamo".
            </p>
            <p className={styles.parrafo}>
              3.- Escribe tu reclamo y envíalo para que nuestros administradores
              puedan revisarlo e investigar el caso.
            </p>
          </AccordionTab>
          <AccordionTab header="03. ¿Puedo tener o cambiar a una cuenta de otro tipo de usuario?">
            <p className={styles.parrafo}>
              Actualmente solo se permite tener una cuenta de un tipo, sea
              cuenta de tipo cliente y/o profesional.
            </p>
          </AccordionTab>
          <AccordionTab header="04. Políticas de Privacidad y Condiciones de Uso">
            <p className={styles.parrafo}>
              Puedes visualizar nuestras políticas de privacidad y condiciones
              de uso.
            </p>
            <Button
              className={styles.button}
              label="Ver Políticas de Privacidad y Condiciones de Uso"
              icon="pi pi-external-link"
              onClick={() => setVisible(true)}
              outlined
            />
            <Dialog
              className={styles.dialogoTerCon}
              header="Políticas de Privacidad y Condiciones de Uso"
              visible={visible}
              onHide={() => setVisible(false)}
            >
              <p className={styles.update}>
                Última actualización: 9 de Noviembre de 2023
              </p>
              <p>
                Por favor, lea cuidadosamente estos Términos y Condiciones de
                Uso antes de utilizar nuestros servicios proporcionados por
                iWork. Al acceder o utilizar la nuestros servicios, usted acepta
                estar sujeto a estos Términos. Si no está de acuerdo con alguna
                parte de los términos, entonces no tendrá permiso para acceder a
                los servicios.
              </p>
              <p className={styles.tittle}>1. Información que Recopilamos</p>
              <p>
                Recopilamos varios tipos de información de tipo personal, tales
                como: nombres, apellidos, número de teléfono, correo
                electrónico, y otra información que los usuarios nos
                proporcionen a la hora de registrarse o iniciar sesión en el
                sistema, como también hacer uso del servicio.
              </p>
              <p className={styles.tittle}>
                2. Como Recopilamos la Información
              </p>
              <p>
                Recopilamos información personal a través de los formularios de
                registro e inicio de sesión del servicio, también como lo es
                dentro de la configuración de los perfiles.
              </p>
              <p className={styles.tittle}>3. Uso de la Información</p>
              <p>
                Utilizamos la información personal para: el funcionamiento del
                servicio (tales como entregar información de contacto para el
                usuario dentro del mismo), enviar actualizaciones por correo
                electrónico sobre actualizaciones, información relacionada con
                la cuenta del usuario (soporte) y mejorar nuestros servicios a
                través de personalizar la experiencia del usuario dentro del
                servicio.
              </p>
              <p className={styles.tittle}>4. Uso de la Información</p>
              <p>
                Compartimos información con proveedores de servicios confiables
                para el funcionamiento del servicio que nosotros proporcionamos,
                tales como el Hosting Web. No vendemos, alquilamos, regalamos o
                proveemos la información personal de nuestros usuarios a
                terceros sin el consentimiento del usuario, excepto cuando la
                ley lo exige.
              </p>
              <p className={styles.tittle}>5. Seguridad de la Información</p>
              <p>
                Implementamos medidas de seguridad tales como: utilización de
                firewalls y cifrado SSL que nos provee nuestro proveedor de
                servicios de Web Hosting, con el objetivo de salvaguardar la
                información del usuario.
              </p>
              <p className={styles.tittle}>6. Enlaces a Sitios Externos</p>
              <p>
                Dentro de nuestro servicio puede encontrar enlaces a otros
                sitios o servicios que no están bajo nuestro control. No somos
                responsables de las prácticas de privacidad de estos sitios
                enlazados. Recomendamos a los usuarios revisar las políticas de
                privacidad de los sitios web de terceros.
              </p>
              <p className={styles.tittle}>
                7. Acceso y Control de la Información Personal
              </p>
              <p>
                Los usuarios pueden acceder, editar o eliminar su información
                personal de nuestros registros en cualquier momento dentro del
                mismo servicio.
              </p>
              <p className={styles.tittle}>8. Consentimiento del Usuario</p>
              <p>
                Al registrarte y hacer uso de nuestro servicio, los usuarios
                están de acuerdo con nuestras políticas de privacidad y
                condiciones de uso.
              </p>
              <p className={styles.tittle}>
                9. Conducta del Usuario y Uso Adecuado del Servicio
              </p>
              <p>
                Al aceptar nuestras políticas de privacidad y condiciones de
                uso, acepta utilizar nuestro servicio de manera adecuada y
                respetuosa. Nos reservamos el derecho de tomar medidas en caso
                de que un usuario no cumpla con las siguientes normas de
                conducta establecidas o se involucre en actividades inapropiadas
                mientras utilice nuestro servicio. Las siguientes normas se
                limitan a:
              </p>
              <p>- Uso fraudulento, engañoso o malicioso del servicio.</p>
              <p>
                - No se acepta la mal utilización de la información, tales como
                la de nombres, información de contacto (número de teléfono y
                correo electrónico) o imágenes para suplantar la identidad de
                una persona en el servicio.
              </p>
              <p>
                - Violación de derechos de autor, marcas registradas u otros
                derechos de propiedad intelectual.
              </p>
              <p>
                - Publicación de contenido ofensivo, obsceno, difamatorio,
                amenazante o de acoso, sea mediante información perteneciente de
                la cuenta referida a nombres de usuario, correo electrónico,
                reseñas e imágenes.
              </p>
              <p>
                - Intentos de eludir medidas de seguridad o acceder a cuentas de
                otros usuarios sin su consentimiento.
              </p>
              <p>
                En caso de que determinemos que un usuario está violando estas
                normas, nos reservamos el derecho de eliminar o cancelar su
                cuenta sin previo aviso.
              </p>
              <p className={styles.tittle}>
                10. Permisos de Acceso en la Aplicación Móvil
              </p>
              <p>
                En nuestra aplicación móvil solicitaremos ciertos permisos de
                accesos para mejorar la experiencia de usuario y proporcionar
                funciones específicas. Al utilizar la aplicación móvil, los
                usuarios pueden esperar que se solicite accesos a los siguientes
                tipos de información:
              </p>
              <p>
                - Galería para Imágenes: La aplicación puede solicitar acceso a
                la galería de imágenes del dispositivo para permitir a los
                usuarios cargar imágenes desde su dispositivo dentro del
                servicio.
              </p>
              <p>
                - Archivos para Descargar: La aplicación puede requerir acceso a
                los archivos del dispositivo para permitir a los usuarios
                descargar archivos desde el servicio.
              </p>
              <p>
                Es importante destacar que solicitamos estos permisos para
                mejorar la funcionalidad y experiencia del usuario en la
                aplicación móvil. Nos comprometemos a utilizar esta información
                de forma segura y responsable solo para fines específicos dentro
                del servicio. No compartimos o compartiremos esta información
                con terceros sin el consentimiento del usuario, excepto cuando
                la ley lo exija.
              </p>
              <p className={styles.tittle}>11. Responsabilidad del Usuario</p>
              <p>
                Al utilizar nuestro servicio, los usuarios aceptan y comprenden
                las siguientes responsabilidades:
              </p>
              <p>
                - Información Precisa: Los usuarios deben proporcionar
                información precisa y actualizada al registrarse en nuestro
                servicio. Cualquier información falsa o engañosa constituye una
                violación de estos términos y puede resultar en la eliminación
                de la cuenta del usuario.
              </p>
              <p>
                - Uso Apropiado: Los usuarios deben utilizar nuestro servicio de
                manera adecuada y respetuosa. No deben realizar actividades
                ilícitas, fraudulentas o dañinas. Esto incluye pero no se limita
                a: La violación de derechos de autor, el acoso, la difamación y
                cualquier otra actividad perjudicial para otros usuarios o
                terceros.
              </p>
              <p>
                - Seguridad de la Cuenta: Los usuarios son responsables de
                mantener la seguridad de sus cuentas, incluyendo las contraseñas
                de acceso. Cualquier actividad realizada desde una cuenta
                registrada se considerará responsabilidad del titular de la
                cuenta.
              </p>
              <p>
                - Colaboración en Investigaciones: En caso de investigaciones
                sobre actividades sospechosas o violaciones de estas políticas,
                los usuarios están obligados a colaborar completamente
                proporcionando la información solicitada por nuestro equipo de
                seguridad.
              </p>
              <p>
                - Cumplimiento Legal: Los usuarios deben cumplir con todas las
                leyes y regulaciones aplicables al utilizar nuestro servicio.
              </p>
              <p>
                El incumplimiento de estas responsabilidades puede resultar en
                medidas disciplinarias, incluyendo la eliminación de la cuenta
                del usuario. Nos reservamos el derecho de tomar estas medidas a
                nuestra discreción, si consideramos que un usuario ha violado
                alguna de estas responsabilidades.
              </p>
              <p className={styles.tittle}>12. Políticas de Seguridad</p>
              <p>
                Nos comprometemos a proteger la información personal e
                integridad de nuestros usuarios y a garantizar la seguridad de
                nuestro servicio. Para más información véase el siguiente
                documento.
              </p>
              <p className={styles.tittle}>13. Contacto</p>
              <p>
                Para consultas o inquietudes sobre nuestras políticas de
                privacidad y condiciones de uso, los usuarios pueden ponerse en
                contacto con nosotros por medio del siguiente correo
                electrónico: “Nrtdevops@gmail.com”.
              </p>
              <p className={styles.tittle}>
                14. Cambios en las Política de Privacidad y Condiciones de Uso
              </p>
              <p>
                Ocasionalmente, las políticas de privacidad y condiciones de uso
                se actualizarán para reflejar cambios en las prácticas de
                privacidad. Se notificará a los usuarios acerca de cambios
                importantes que se consideren de gran impacto a las políticas de
                privacidad en el funcionamiento de nuestro servicio mediante
                correo electrónico.
              </p>
              <p className={styles.update}>
                Última actualización: 9 de Noviembre de 2023
              </p>
            </Dialog>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
};
