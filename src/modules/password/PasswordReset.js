import { useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button } from '../../components/button/Button.js';
import { Input } from '../../components/input/Input.js';
import { Label } from '../../components/label/Label.js';
import { Title } from '../../components/title/Title.js';
import { api } from '../../services/api/api.js';

const passwordUpdateEndpoint = process.env.REACT_APP_ENDPOINT_PASSWORD_UPDATE;

export const PasswordReset = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // obtiene el token de la URL
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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
        <Button label={loading ? 'Actualizando...' : 'Confirmar'} onClick={handleReset} />
        <Button label={'Cancelar'} onClick={handleCancel} />
      </div>
    </div>
  );
};

export default PasswordReset;
