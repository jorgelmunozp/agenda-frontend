import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { FiHome, FiUser, FiPhone, FiLogOut, FiX } from 'react-icons/fi';
import { AuthContext } from '../../services/auth/authContext.js';
import { types } from '../../types/types.js';
import { Logo } from '../logo/Logo.js';
import './AppMenu.scss';

export const AppMenu = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const iconColor = '#5c3b99';

  const handleStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const goTo = (path) => {
    navigate(path);
    closeMenu();
  };

  const handleLogout = () => {
    dispatch({ type: types.logout });
    navigate('/', { replace: true });
    closeMenu();
  };

  return (
    <Menu left isOpen={isOpen} onStateChange={handleStateChange}>
      <div className="bm-header">
        <Logo color={iconColor} />
        <button className="bm-close" onClick={closeMenu} aria-label="Cerrar menú">
          <FiX />
        </button>
      </div>

      <hr className="bm-hr" />

      <button className="menu-item" onClick={() => goTo('/home')}>
        <FiHome color={iconColor} /> Tareas
      </button>

      <button className="menu-item" onClick={() => goTo('/about-us')}>
        <FiUser color={iconColor} /> Nosotros
      </button>

      <button className="menu-item" onClick={() => goTo('/contact')}>
        <FiPhone color={iconColor} /> Contacto
      </button>

      <button className="menu-item" onClick={handleLogout}>
        <FiLogOut color={iconColor} /> Cerrar sesión
      </button>
    </Menu>
  );
};

export default AppMenu;
