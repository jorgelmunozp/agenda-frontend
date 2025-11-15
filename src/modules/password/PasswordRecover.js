import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api/api.js';
import { Title } from '../../components/title/Title.js';
import { Label } from '../../components/label/Label.js';
import { Input } from '../../components/input/Input.js';
import { Button } from '../../components/button/Button.js';
import { FiAtSign } from 'react-icons/fi';
import Swal from 'sweetalert2';

const passwordRecoverEndpoint = process.env.REACT_APP_ENDPOINT_PASSWORD_RECOVER;

export const PasswordRecover = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleRecover = async () => {
    try {
      const response = await api.post(passwordRecoverEndpoint, { email }, { headers: { 'x-client': 'web' } });

      // Si es exitoso, redirige a home
      if (200 <= response.status && response.status <= 299) {
        console.log(response.data);
        Swal.fire({
          text: response.data.message,
          icon: 'success',
        });
        navigate('/login');
      }
    } catch (error) {
      console.error('Error recovering password: ', error.response?.data || error.message);

      // Extraer los mensajes del error (array o string)
      const messages = Array.isArray(error.response?.data?.error?.message) ? error.response.data.error.message : [error.response?.data?.error?.message || error.message];

      // Generar HTML con viñetas
      let errorHtml = '<ul style="padding-left: 20px; text-align: justify; margin: 0;">';
      for (const msg of messages) {
        errorHtml += `<li style="margin-bottom: 6px; color: #d33; font-family: Poppins, sans-serif;">${msg}</li>`;
      }
      errorHtml += '</ul>';

      // Mostrar el popup
      Swal.fire({
        title: 'Faltan Datos',
        html: errorHtml,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'home-swal-popup',
          title: 'swal-title',
          content: 'swal-content',
        },
      });
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="App-container">
      <div className="App-form">
        <Title title="RECUPERAR CONTRASEÑA" />

        <Label text="Correo" />
        <Input Icon={FiAtSign} type={'text'} value={email} setState={setEmail} />

        <br />
        <Button label={'Enviar enlace'} onClick={handleRecover} />
        <Button label={'Cancelar'} onClick={handleCancel} />
      </div>
    </div>
  );
};

export default PasswordRecover;
