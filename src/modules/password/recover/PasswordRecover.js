import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../../components/title/Title';
import { Input } from '../../../components/input/Input';
import { Label } from '../../../components/label/Label';
import { FiAtSign } from "react-icons/fi";
import { api } from '../../../services/api/api';
import Swal from 'sweetalert2';
import './PasswordRecover.scss';

export const PasswordRecover = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleRecover = async () => {
    try {
        const response = await api.post('/password/recover', {
            email
        });

        // Si es exitoso, redirige a home
        if (200 <= response.status && response.status <= 299) { 
            console.log(response.data);
            Swal.fire({
                text: response.data.message,
                icon: "success"        
            });
            navigate('/login'); 
        }

    } catch (error) {
        console.error('Error recovering password: ', error.response?.data || error.message);

        // Extraer los mensajes del error (array o string)
        const messages = Array.isArray(error.response?.data?.error?.message)
          ? error.response.data.error.message
          : [error.response?.data?.error?.message || error.message];

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
            content: 'swal-content'
          }
        });
      }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
        <div className="recover-container">
          <div className="recover-form">
            <Title title="RECUPERAR CONTRASEÑA" />
  
            <Label text="Correo" />
            <Input Icon={FiAtSign} type={'text'} value={email} setState={setEmail} />
    
            <br />
            <button className="recover-button" onClick={handleRecover}>
              Recuperar contraseña
            </button>
            <button className="recover-button" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </div>
  )
}

export default PasswordRecover;