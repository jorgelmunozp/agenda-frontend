import { useState } from 'react';
import { FiAtSign } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { AppAlert } from '../../components/alert/AppAlert';
import { Button } from '../../components/button/Button.js';
import { Input } from '../../components/input/Input.js';
import { Label } from '../../components/label/Label.js';
import { Title } from '../../components/title/Title.js';
import { errorLines } from '../../helpers/errorLines.js';
import { useAlert } from '../../hooks/useAlert';
import { api } from '../../services/api/api.js';

const passwordRecoverEndpoint = process.env.REACT_APP_ENDPOINT_PASSWORD_RECOVER;

export const PasswordRecover = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { alert, showError, showSuccess, hideAlert } = useAlert();

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      const response = await api.post(passwordRecoverEndpoint, { email }, { headers: { 'x-client': 'web' } });

      if (200 <= response.status && response.status <= 299) {
        // Navega cuando el usuario pulse el botón del alert
        showSuccess('Enlace enviado', response.data.message, [
          {
            text: 'Ir al login',
            onPress: () => navigate('/login'),
          },
        ]);
      }
    } catch (error) {
      console.error('Error recovering password: ', error.response?.data || error.message);

      const rawMsg = error?.response?.data?.error?.message || error.message;
      const messages = errorLines(rawMsg);

      showError('Error', messages);
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
          <Title title="RECUPERAR CONTRASEÑA" />

          <Label text="Correo" />
          <Input Icon={FiAtSign} type="text" value={email} setState={setEmail} />

          <br />
          <Button label={loading ? 'Enviando...' : 'Enviar enlace'} onClick={handleSendEmail} disabled={loading} />
          <Button label="Cancelar" onClick={handleCancel} />
        </div>
      </div>

      <AppAlert visible={alert.visible} type={alert.type} title={alert.title} message={alert.message} buttons={alert.buttons} onClose={hideAlert} />
    </>
  );
};

export default PasswordRecover;
