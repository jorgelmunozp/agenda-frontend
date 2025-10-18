import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../components/Title';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { FiLock } from "react-icons/fi";
import '../assets/styles/scss/PasswordCreate.scss';

export const PasswordCreate = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleCreate = () => {
    // Lógica de create aquí
    console.log('Create', { password });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
        <div className="create-container">
          <div className="create-form">
            <Title title="CREAR NUEVA CONTRASEÑA" />
  
            <Label text="Contraseña" />
            <Input Icon={FiLock} type={'password'} value={password} setState={setPassword} />
    
            <br />
            <button className="create-button" onClick={handleCreate}>
              Confirmar
            </button>
            <button className="create-button" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </div>
  )
}

export default PasswordCreate;