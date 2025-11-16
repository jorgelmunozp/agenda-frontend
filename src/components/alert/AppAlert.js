import { Button } from '../button/Button';

const Icon = {
  error: { symbol: '✖', iconColor: '#f27474', ring: '#f27474', accent: '#ef4444' },
  success: { symbol: '✔', iconColor: '#22c55e', ring: '#86efac', accent: '#22c55e' },
  info: { symbol: 'i', iconColor: '#3b82f6', ring: '#93c5fd', accent: '#3b82f6' },
};

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 16px',
    zIndex: 9999,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    width: '100%',
    maxWidth: 520,
    boxShadow: '0 20px 40px rgba(15,23,42,0.35)',
  },
  iconWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 10,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 5,
    borderStyle: 'solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    color: '#4b5563',
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 20,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 8,
    marginBottom: 6,
  },
  li: {
    display: 'flex',
    alignItems: 'center',
    columnGap: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  liText: {
    flex: 1,
    fontSize: 12,
    lineHeight: '20px',
  },
  actions: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center',
  },
};

export const AppAlert = ({ visible, title, message, onClose, type = 'info' }) => {
  if (!visible) return null;

  const icon = Icon[type] || Icon.info;

  const lines = Array.isArray(message)
    ? message.filter(Boolean)
    : String(message || '')
        .split('\n')
        .map((t) => t.trim())
        .filter(Boolean);

  const handleClose = () => {
    if (typeof onClose === 'function') onClose();
  };

  return (
    <div style={styles.overlay} onClick={handleClose}>
      <div style={styles.card} onClick={(e) => e.stopPropagation()}>
        <div style={styles.iconWrap}>
          <div style={{ ...styles.iconCircle, borderColor: icon.ring }}>
            <span style={{ fontSize: 40, lineHeight: 1, color: icon.iconColor }}>{icon.symbol}</span>
          </div>
        </div>

        {title ? <h3 style={styles.title}>{title}</h3> : null}

        {lines.length > 0 && (
          <div style={styles.list}>
            {lines.map((t, i) => (
              <div key={i} style={styles.li}>
                <div style={{ ...styles.dot, backgroundColor: icon.accent }} />
                <span style={{ ...styles.liText, color: icon.accent }}>{t}</span>
              </div>
            ))}
          </div>
        )}

        <div style={styles.actions}>
          <Button label="Aceptar" onClick={handleClose} type={1} />
        </div>
      </div>
    </div>
  );
};

export default AppAlert;
