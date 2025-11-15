import { useContext } from 'react';
import { AuthContext } from '../../services/auth/authContext';
import { Logo } from '../logo/Logo';

import './Header.scss';

export const Header = () => {
  const { user } = useContext(AuthContext);
  const backgroundClass = user.logged ? 'background-logged' : 'background-public';
  const colorClass = user.logged ? 'color-logged' : 'color-public';

  return (
    <div className={`header ${backgroundClass}`}>
      <h1 className={`${colorClass}`}>
        Organize<span className="u-letter">U</span>
      </h1>

      {user.logged && <Logo className="header-logo" width={1.25} height={1.25} />}
    </div>
  );
}

export default Header;
