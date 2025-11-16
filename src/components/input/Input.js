import './Input.scss';

export const Input = ({ Icon, type = 'text', value, placeholder = '', setState, multiline = false, rows = 3 }) => {
  const handleChange = (e) => {
    if (typeof setState === 'function') {
      setState(e.target.value);
    }
  };

  if (multiline) {
    return (
      <div className="input-with-icon">
        {Icon ? <Icon className="input-icon" /> : null}
        <textarea placeholder={placeholder} value={value} rows={rows} onChange={handleChange} />
      </div>
    );
  }

  return (
    <div className="input-with-icon">
      {Icon ? <Icon className="input-icon" /> : null}
      <input type={type} placeholder={placeholder} value={value} onChange={handleChange} />
    </div>
  );
};

export default Input;
