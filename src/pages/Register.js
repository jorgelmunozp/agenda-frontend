import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../components/Title';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { FiUser, FiAtSign, FiLock } from "react-icons/fi";
import { PiUserCircleFill } from "react-icons/pi";
import { api } from '../services/api';
import Swal from 'sweetalert2';
import '../assets/styles/scss/pages/Register.scss';

export const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
const handleRegister = async () => {
    try {
        const response = await api.post('/users', {
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
        Swal.fire({ text: error.response?.data.error.message || error.message, icon: "error" });
        console.error('Error creating user: ', error.response?.data || error.message);
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