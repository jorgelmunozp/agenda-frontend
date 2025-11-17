import { useState, useCallback } from 'react';

export const useAlert = (initialState = {}) => {
  const [state, setState] = useState({
    visible: false,
    type: 'info',
    title: '',
    message: '',
    buttons: [],
    ...initialState,
  });

  const showAlert = useCallback(({ type = 'info', title = '', message = '', buttons } = {}) => {
    const safeButtons = Array.isArray(buttons) && buttons.length ? buttons : [{ text: 'Aceptar' }];

    setState({
      visible: true,
      type,
      title,
      message,
      buttons: safeButtons,
    });
  }, []);

  const hideAlert = useCallback(() => {
    setState((prev) => ({ ...prev, visible: false }));
  }, []);

  const showError = useCallback((title, message, buttons) => showAlert({ type: 'error', title, message, buttons }), [showAlert]);

  const showSuccess = useCallback((title, message, buttons) => showAlert({ type: 'success', title, message, buttons }), [showAlert]);

  const showInfo = useCallback((title, message, buttons) => showAlert({ type: 'info', title, message, buttons }), [showAlert]);

  // compatibilidad: puedes usar alertState o alert
  return {
    alert: state,
    alertState: state,
    showAlert,
    hideAlert,
    showError,
    showSuccess,
    showInfo,
  };
};

export default useAlert;
