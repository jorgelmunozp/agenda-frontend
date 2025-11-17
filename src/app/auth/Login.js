import { useContext, useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { PiUserCircleFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { AppAlert } from '../../components/alert/AppAlert';
import { Button } from '../../components/button/Button.js';
import { Input } from '../../components/input/Input.js';
import { Label } from '../../components/label/Label.js';
import { Title } from '../../components/title/Title.js';
import { useAlert } from '../../hooks/useAlert';
import { api } from '../../services/api/api.js';
import { AuthContext } from '../../services/auth/authContext.js';
import { types } from '../../services/auth/types/types.js';

const authEndpoint = process.env.REACT_APP_ENDPOINT_AUTH;

export const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { alert, showError, hideAlert } = useAlert();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.post(authEndpoint, {
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

        const lastPath = localStorage.getItem('lastPath') || '/';
        navigate(lastPath, {
          replace: true,
        });
      }
    } catch (error) {
      console.error('Error user login: ', error.response?.data || error.message);

      const rawMsg = error.response?.data?.error?.message;
      const messages = Array.isArray(rawMsg) ? rawMsg : [rawMsg || error.message];

      // usamos AppAlert con listado de mensajes (array)
      showError('Error', messages);
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const forgotPassword = () => {
    navigate('/password-recover');
  };

  return (
    <>
      <div className="App-container">
        <div className="App-form">
          <Title title="INICIAR SESION" />

          <Label text="Ingresa tu usuario" />
          <Input Icon={PiUserCircleFill} type="text" value={username} setState={setUsername} />

          <Label text="Ingresa tu contraseña" />
          <Input Icon={FiLock} value={password} type="password" setState={setPassword} />

          <br />
          <Button label={loading ? 'Cargando...' : 'Ingresar'} onClick={handleLogin} disabled={loading} />
          <Button label="Registrarse" onClick={goToRegister} />
          <Button label="¿Olvidaste tu contraseña?" onClick={forgotPassword} type={2} />
        </div>
      </div>

      <AppAlert visible={alert.visible} type={alert.type} title={alert.title} message={alert.message} onClose={hideAlert} />
    </>
  );
};

export default Login;
