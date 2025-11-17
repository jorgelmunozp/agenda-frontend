import { useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { AppAlert } from '../../components/alert/AppAlert';
import { Button } from '../../components/button/Button.js';
import { Input } from '../../components/input/Input.js';
import { Label } from '../../components/label/Label.js';
import { Title } from '../../components/title/Title.js';
import { useAlert } from '../../hooks/useAlert';
import { api } from '../../services/api/api.js';

const passwordUpdateEndpoint = process.env.REACT_APP_ENDPOINT_PASSWORD_UPDATE;

export const PasswordReset = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // token de la URL

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { alert, showError, showSuccess, hideAlert } = useAlert();

  const handleReset = async () => {
    setLoading(true);
    try {
      const response = await api.patch(passwordUpdateEndpoint, {
        token,
        newPassword: password,
      });

      if (200 <= response.status && response.status <= 299) {
        showSuccess('Listo', response.data.message, [
          {
            text: 'Cerrar',
            onPress: () => window.close(),
          },
        ]);
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

      <AppAlert visible={alert.visible} type={alert.type} title={alert.title} message={alert.message} buttons={alert.buttons} onClose={hideAlert} />
    </>
  );
};

export default PasswordReset;
