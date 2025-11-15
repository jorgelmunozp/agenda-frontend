import './Button.scss';
import './Button2.scss';

export const Button = ({ label='', className='', onClick, disabled=false, type=1 }) => {
  const typeClass = type === 2 ? 'button2' : 'button';

  return (
    <button className={`${typeClass} ${className}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
