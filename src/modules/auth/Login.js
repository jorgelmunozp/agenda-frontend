import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/auth/authContext.js';
import { types } from '../../types/types.js';
import { api } from '../../services/api/api.js';
import { Input } from '../../components/input/Input.js';
import { Label } from '../../components/label/Label.js';
import { Title } from '../../components/title/Title.js';
import { Button } from '../../components/button/Button.js';
import { FiLock } from 'react-icons/fi';
import { PiUserCircleFill } from 'react-icons/pi';
import Swal from 'sweetalert2';

const authEndpoint = process.env.REACT_APP_ENDPOINT_AUTH;

export const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post(authEndpoint, {
        username,
        password,
      });

      // Si Success, redirige a home y guarda Token en sessionStorage
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

      // Extraer los mensajes del error (puede ser array o string)
      const messages = Array.isArray(error.response?.data?.error?.message) ? error.response.data.error.message : [error.response?.data?.error?.message || error.message];

      // Generar HTML con viñetas
      let errorHtml = '<ul style="padding-left: 20px; text-align: justify; margin: 0;">';
      for (const msg of messages) {
        errorHtml += `<li style="margin-bottom: 6px; color: #d33; font-family: Poppins, sans-serif;">${msg}</li>`;
      }
      errorHtml += '</ul>';

      // Mostrar el popup
      Swal.fire({
        title: 'Faltan Datos',
        html: errorHtml,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'home-swal-popup',
          title: 'swal-title',
          content: 'swal-content',
        },
      });
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const forgotPassword = () => {
    navigate('/password-recover');
  };

  return (
    <div className="App-container">
      <div className="App-form">
        <Title title="INICIAR SESION" />

        <Label text="Ingresa tu usuario" />
        <Input Icon={PiUserCircleFill} type={'text'} value={username} setState={setUsername} />

        <Label text="Ingresa tu contraseña" />
        <Input Icon={FiLock} value={password} type={'password'} setState={setPassword} />

        <br />
        <Button label={'Ingresar'} onClick={handleLogin} />
        <Button label={'Registrarse'} onClick={goToRegister} />
        <Button label={'¿Olvidaste tu contraseña?'} onClick={forgotPassword} type={2}/>
      </div>
    </div>
  );
};

export default Login;
