import { useContext, useState } from 'react';
import { FiAtSign, FiLock, FiUser } from 'react-icons/fi';
import { PiUserCircleFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button/Button.js';
import { Input } from '../../components/input/Input.js';
import { Label } from '../../components/label/Label.js';
import { Title } from '../../components/title/Title.js';
import { AppAlert } from '../../components/alert/AppAlert';
import { api } from '../../services/api/api.js';
import { AuthContext } from '../../services/auth/authContext.js';
import { types } from '../../services/auth/types/types.js';
import { useAlert } from '../../hooks/useAlert';

const usersEndpoint = process.env.REACT_APP_ENDPOINT_USERS;

export const Register = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { alertState, showError, hideAlert } = useAlert();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await api.post(usersEndpoint, {
        name,
        email,
        username,
        password,
      });

      if (200 <= response.status && response.status <= 299) {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userId', response.data.id);

        const action = {
          type: types.login,
          payload: { name: username },
        };
        dispatch(action);

        navigate('/home');
      }
    } catch (error) {
      console.error('Error creating user: ', error.response?.data || error.message);

      const rawMsg = error?.response?.data?.error?.message;
      const messages = Array.isArray(rawMsg) ? rawMsg : [rawMsg || error.message];

      // AppAlert soporta array, así que le pasamos los mensajes directo
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
          <Title title="REGISTRARSE" />

          <Label text="Nombre" />
          <Input Icon={FiUser} type="text" value={name} setState={setName} />

          <Label text="Correo" />
          <Input Icon={FiAtSign} type="text" value={email} setState={setEmail} />

          <Label text="Usuario" />
          <Input Icon={PiUserCircleFill} type="text" value={username} setState={setUsername} />

          <Label text="Contraseña" />
          <Input Icon={FiLock} value={password} type="password" setState={setPassword} />

          <br />
          <Button label={loading ? 'Registrando...' : 'Crear cuenta'} onClick={handleRegister} disabled={loading} />
          <Button label="Cancelar" onClick={handleCancel} />
        </div>
      </div>

      <AppAlert visible={alertState.visible} type={alertState.type} title={alertState.title} message={alertState.message} onClose={hideAlert} />
    </>
  );
};

export default Register;
