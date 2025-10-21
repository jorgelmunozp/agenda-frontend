import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/auth/authContext.js';
import { types } from '../../types/types.js';
import { slide as Menu } from "react-burger-menu";
import { FiHome, FiUser, FiPhone, FiLogOut } from "react-icons/fi";
import "./AppMenu.scss";

export const AppMenu = () => {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const iconColor = '#5c3b99';

    const handleLogout = () => {
        dispatch({ type: types.logout });
        navigate("/", { replace: true });
    }

  return (
    <Menu left>
      <hr className='bm-hr' />
      <a className="menu-item" href="/home">
        <FiHome color={iconColor} /> Tareas
      </a>
      <a className="menu-item" href="/about-us">
        <FiUser color={iconColor} /> Nosotros
      </a>
      <a className="menu-item" href="/contact">
        <FiPhone color={iconColor} /> Contacto
      </a>
      <a className="menu-item" href="/login" onClick={handleLogout}>
        <FiLogOut color={iconColor} /> Cerrar sesión
      </a>
    </Menu>
  );
};

export default AppMenu;