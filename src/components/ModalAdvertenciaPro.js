import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InfoIcon from '@mui/icons-material/Info';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#5572D1', 
  color: 'white', 
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalAdvertenciaPro() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    handleOpen();
  }, []); 

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <InfoIcon style={{ marginRight: '8px' }} />Importante
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Tu seguridad es importante para nosotros, si descubres algún perfil sospechoso o solicitud extraña puedes denunciarla para revisión, Juntos podemos mejorar nuestra comunidad 
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}