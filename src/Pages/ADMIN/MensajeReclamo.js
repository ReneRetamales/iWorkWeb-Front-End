import React from 'react'
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const MensajeReclamo = ({ visible, onHide, reclamoData }) => {
    return (
        <div>
            <Dialog
                visible={visible}
                onHide={onHide}
                header="Detalles Reclamo"
                modal
                style={{ width: '50vw' }}
            >
                <div>
                    <h4>Destinatario:</h4>
                    <p> {reclamoData.dueno.nombre} {reclamoData.dueno.apellido}</p>
                    <h4>Correo:</h4>
                    <p>{reclamoData.dueno.correo}</p>
                    <h4>Mensaje:</h4>
                    <p>{reclamoData.resena}</p>
                </div>
                <div>
                    <Button label='Cerrar' onClick={onHide} className='p-mt-4'/>
                </div>
            </Dialog>
        </div>
    )
}

export default MensajeReclamo