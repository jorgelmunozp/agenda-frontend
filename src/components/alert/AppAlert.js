import { Button } from '../button/Button';
import { errorLines } from '../../helpers/errorLines';
import './AppAlert.scss';

const Icon = {
  error: { symbol: '✖', iconColor: '#f27474', ring: '#f27474', accent: '#ef4444' },
  success: { symbol: '✔', iconColor: '#22c55e', ring: '#22c55e', accent: '#22c55e' },
  info: { symbol: 'i', iconColor: '#3b82f6', ring: '#3b82f6', accent: '#3b82f6' },
};

export const AppAlert = ({ visible, title, message, onClose, type = 'info' }) => {
  if (!visible) return null;

  const icon = Icon[type] || Icon.info;
  const lines = errorLines(message);

  const handleClose = () => {
    if (typeof onClose === 'function') onClose();
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
          <Button label="Aceptar" onClick={handleClose} type={1} />
        </div>
      </div>
    </div>
  );
};

export default AppAlert;
