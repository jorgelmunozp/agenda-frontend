import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api/api.js';
import { Title } from '../../components/title/Title.js';
import { Label } from '../../components/label/Label.js';
import { Input } from '../../components/input/Input.js';
import { Button } from '../../components/button/Button.js';
import { FiLock } from 'react-icons/fi';
import Swal from 'sweetalert2';

const passwordUpdateEndpoint = process.env.REACT_APP_ENDPOINT_PASSWORD_UPDATE;

export const PasswordReset = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // obtiene el token de la URL
  const [password, setPassword] = useState('');

  const handleReset = async () => {
    try {
      const response = await api.patch(passwordUpdateEndpoint, {
        token,
        newPassword: password,
      });

      // Si es exitoso, redirige a home
      if (200 <= response.status && response.status <= 299) {
        console.log(response.data.message);
        Swal.fire({
          text: response.data.message,
          icon: 'success',
        });
        navigate('/login');
      }
    } catch (error) {
      Swal.fire({
        text: error.response?.data.error.message || error.message,
        icon: 'error',
      });
      console.error('Error user login: ', error.response?.data || error.message);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="App-container">
      <div className="App-form">
        <Title title="CREAR NUEVA CONTRASEÑA" />

        <Label text="Contraseña" />
        <Input Icon={FiLock} type={'password'} value={password} setState={setPassword} />

        <br />
        <Button label={'Confirmar'} onClick={handleReset} />
        <Button label={'Cancelar'} onClick={handleCancel} />
      </div>
    </div>
  );
};

export default PasswordReset;
