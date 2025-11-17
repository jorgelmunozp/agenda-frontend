import { Button } from '../button/Button';
import { errorLines } from '../../helpers/errorLines';
import './AppAlert.scss';

const Icon = {
  error: { symbol: '✖', iconColor: '#f27474', ring: '#f27474', accent: '#ef4444' },
  success: { symbol: '✔', iconColor: '#22c55e', ring: '#22c55e', accent: '#22c55e' },
  info: { symbol: 'i', iconColor: '#3b82f6', ring: '#3b82f6', accent: '#3b82f6' },
};

export const AppAlert = ({ visible, title, message, onClose, type = 'info', buttons }) => {
  if (!visible) return null;

  const icon = Icon[type] || Icon.info;
  const lines = errorLines(message);

  // fallback si no hay buttons
  const actions = Array.isArray(buttons) && buttons.length ? buttons : [{ text: 'Aceptar' }];

  const handleClose = () => {
    if (typeof onClose === 'function') onClose();
  };

  const handleButtonClick = (btn) => {
    if (typeof btn?.onPress === 'function') {
      btn.onPress();
    }
    handleClose();
  };

  return (
    <div className="app-alert-overlay" onClick={handleClose}>
      <div className="app-alert-card" onClick={(e) => e.stopPropagation()}>
        <div className="app-alert-icon-wrap">
          <div className="app-alert-icon-circle" style={{ borderColor: icon.ring }}>
            <span className="app-alert-icon-symbol" style={{ color: icon.iconColor }}>
              {icon.symbol}
            </span>
          </div>
        </div>

        {title ? <h3 className="app-alert-title">{title}</h3> : null}

        {lines.length > 0 && (
          <div className="app-alert-list">
            {lines.map((t, i) => (
              <div key={i} className="app-alert-li">
                <div className="app-alert-dot" style={{ backgroundColor: icon.accent }} />
                <span className="app-alert-li-text" style={{ color: '#000' }}>
                  {t}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="app-alert-actions">
          {actions.map((btn, i) => (
            <Button key={i} label={btn.text || 'Aceptar'} type={1} onClick={() => handleButtonClick(btn)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppAlert;
