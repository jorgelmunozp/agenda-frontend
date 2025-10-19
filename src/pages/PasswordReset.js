import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Title } from '../components/Title';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { FiLock } from "react-icons/fi";
import { api } from '../services/api';
import Swal from 'sweetalert2';
import '../assets/styles/scss/pages/PasswordReset.scss';

export const PasswordReset = () => {
  const navigate = useNavigate();
  const { token } = useParams();      // 👈 obtiene el token de la URL
  const [password, setPassword] = useState('');

  const handleReset = async () => {
    try {
        const response = await api.patch(`/password/update/${token}`, {
            password,
        });

        // Si es exitoso, redirige a home
        if (200 <= response.status && response.status <= 299) { 
            console.log(response.data);
        }

    } catch (error) {
        Swal.fire({
            text: error.response?.data.error.message || error.message,
            icon: "error"        
        });
        console.error('Error user login: ', error.response?.data || error.message);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
        <div className="reset-container">
          <div className="reset-form">
            <Title title="CREAR NUEVA CONTRASEÑA" />
  
            <Label text="Contraseña" />
            <Input Icon={FiLock} type={'password'} value={password} setState={setPassword} />
    
            <br />
            <button className="reset-button" onClick={handleReset}>
              Confirmar
            </button>
            <button className="reset-button" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </div>
  )
}

export default PasswordReset;