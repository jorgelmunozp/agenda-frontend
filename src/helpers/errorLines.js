export const errorLines = (message) => {
  if (Array.isArray(message)) {
    return message
      .map((m) => (m == null ? '' : String(m)))
      .map((t) => t.trim())
      .filter(Boolean);
  }

  return String(message || '')
    .split('\n')
    .map((t) => t.trim())
    .filter(Boolean);
};

export default errorLines;
