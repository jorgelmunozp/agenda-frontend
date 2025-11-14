import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../../components/title/Title';
import { Input } from '../../../components/input/Input';
import { Label } from '../../../components/label/Label';
import { FiUser, FiAtSign, FiLock } from "react-icons/fi";
import { PiUserCircleFill } from "react-icons/pi";
import { api } from '../../../services/api/api';
import Swal from 'sweetalert2';
import './Register.scss';

const usersEndpoint = process.env.REACT_APP_ENDPOINT_USERS;

export const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
const handleRegister = async () => {
    try {
        const response = await api.post(usersEndpoint, {
            name,
            email,
            username,
            password,
        });

        // Si es exitoso, redirige a home
        if (200 <= response.status && response.status <= 299) { 
            console.log(response.data);
            navigate('/home'); 
        }

    } catch (error) {
        console.error('Error creating user: ', error.response?.data || error.message);

        // Extraer los mensajes del error
        const messages = error.response?.data?.error?.message || [error.message];

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
    <div className="register-container">
      <div className="register-form">
        <Title title="REGISTRARSE" />

        <Label text="Nombre" />
        <Input Icon={FiUser} type={'text'} value={name} setState={setName} />

        <Label text="Correo" />
        <Input Icon={FiAtSign} type={'text'} value={email} setState={setEmail} />

        <Label text="Usuario" />
        <Input Icon={PiUserCircleFill} type={'text'} value={username} setState={setUsername} />

        <Label text="Contraseña" />
        <Input Icon={FiLock} value={password} type={'password'} setState={setPassword} />

        <br />
        <button className="register-button" onClick={handleRegister}>
          Crear cuenta
        </button>
        <button className="register-button" onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default Register;