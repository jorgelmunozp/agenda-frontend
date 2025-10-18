import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../components/Title';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { FiAtSign } from "react-icons/fi";
import { api } from '../services/api';
import Swal from 'sweetalert2';
import '../assets/styles/scss/PasswordRecover.scss';

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
        Swal.fire({
            text: error.response?.data.error.message || error.message,
            icon: "error"        
        });
        console.error('Error recovering password: ', error.response?.data || error.message);
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