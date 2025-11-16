import { useState } from 'react';
import { FiAtSign } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button/Button.js';
import { Input } from '../../components/input/Input.js';
import { Label } from '../../components/label/Label.js';
import { Title } from '../../components/title/Title.js';
import { AppAlert } from '../../components/alert/AppAlert';
import { api } from '../../services/api/api.js';
import { useAlert } from '../../hooks/useAlert';

const passwordRecoverEndpoint = process.env.REACT_APP_ENDPOINT_PASSWORD_RECOVER;

export const PasswordRecover = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { alertState, showError, showSuccess, hideAlert } = useAlert();

  const handleRecover = async () => {
    setLoading(true);
    try {
      const response = await api.post(passwordRecoverEndpoint, { email }, { headers: { 'x-client': 'web' } });

      if (200 <= response.status && response.status <= 299) {
        console.log(response.data);

        // Mensaje de éxito usando AppAlert
        showSuccess('Recuperar contraseña', response.data.message);

        // Redirige al login (igual que antes)
        navigate('/login');
      }
    } catch (error) {
      console.error('Error recovering password: ', error.response?.data || error.message);

      const rawMsg = error.response?.data?.error?.message;
      const messages = Array.isArray(rawMsg) ? rawMsg : [rawMsg || error.message];

      // Mostramos el error con AppAlert (acepta array de mensajes)
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
          <Button label={loading ? 'Enviando...' : 'Enviar enlace'} onClick={handleRecover} disabled={loading} />
          <Button label="Cancelar" onClick={handleCancel} />
        </div>
      </div>

      <AppAlert visible={alertState.visible} type={alertState.type} title={alertState.title} message={alertState.message} onClose={hideAlert} />
    </>
  );
};

export default PasswordRecover;
