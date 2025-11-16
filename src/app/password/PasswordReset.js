import { useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/button/Button.js';
import { Input } from '../../components/input/Input.js';
import { Label } from '../../components/label/Label.js';
import { Title } from '../../components/title/Title.js';
import { AppAlert } from '../../components/alert/AppAlert';
import { api } from '../../services/api/api.js';
import { useAlert } from '../../hooks/useAlert';

const passwordUpdateEndpoint = process.env.REACT_APP_ENDPOINT_PASSWORD_UPDATE;

export const PasswordReset = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // token de la URL

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { alertState, showError, showSuccess, hideAlert } = useAlert();

  const handleReset = async () => {
    setLoading(true);
    try {
      const response = await api.patch(passwordUpdateEndpoint, {
        token,
        newPassword: password,
      });

      if (200 <= response.status && response.status <= 299) {
        console.log(response.data.message);

        // Mensaje de éxito con AppAlert
        showSuccess('Actualizar contraseña', response.data.message);

        // Navegar al login
        navigate('/login');
      }
    } catch (error) {
      console.error('Error user login: ', error.response?.data || error.message);

      const msg = error?.response?.data?.error?.message || error.message || 'Error actualizando contraseña.';

      // Mensaje de error con AppAlert
      showError('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
      <div className="App-container">
        <div className="App-form">
          <Title title="CREAR NUEVA CONTRASEÑA" />

          <Label text="Contraseña" />
          <Input Icon={FiLock} type="password" value={password} setState={setPassword} />

          <br />
          <Button label={loading ? 'Actualizando...' : 'Confirmar'} onClick={handleReset} disabled={loading} />
          <Button label="Cancelar" onClick={handleCancel} />
        </div>
      </div>

      <AppAlert visible={alertState.visible} type={alertState.type} title={alertState.title} message={alertState.message} onClose={hideAlert} />
    </>
  );
};

export default PasswordReset;
