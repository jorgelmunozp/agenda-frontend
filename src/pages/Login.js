import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/authContext.js';
import { types } from '../types/types.js';
import { Title } from '../components/Title';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { PiUserCircleFill } from "react-icons/pi";
import { FiLock } from "react-icons/fi";
import { api } from '../services/api';
import Swal from 'sweetalert2';
import '../assets/styles/scss/Login.scss';

export const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        const response = await api.post('/auth/login', {
            username,
            password,
        });

        // Si es exitoso, redirige a home
        if (200 <= response.status && response.status <= 299) { 
            console.log(response.data);
                        // Guarda en sessionStorage
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('userId', response.data.id);

            const action = {
                type: types.login,
                payload: { name: username }
            }
            dispatch(action);
  
            const lastPath = localStorage.getItem('lastPath') || '/';
            navigate(lastPath, {
                replace: true
            });
        }

    } catch (error) {
        Swal.fire({
            text: error.response?.data.error.message || error.message,
            icon: "error"        
        });
        console.error('Error user login: ', error.response?.data || error.message);
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const forgotPassword = () => {
    navigate('/password-recover');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <Title title="INICIAR SESION" />
        
        <Label text="Ingresa tu usuario" />
        <Input Icon={PiUserCircleFill} type={'text'} value={username} setState={setUsername} />
        
        <Label text="Ingresa tu contraseña" />
        <Input Icon={FiLock} value={password} type={'password'} setState={setPassword} />
        
        <br />
        <button className="login-button" onClick={handleLogin}>
          Ingresar
        </button>
        <button className="login-button" onClick={goToRegister}>
          Registrarse
        </button>
        <button className="login-link-button" onClick={forgotPassword}>
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </div>
  );
};

export default Login;