import { useState, useCallback } from 'react';

export const useAlert = (initialState = {}) => {
  const [alertState, setAlertState] = useState({
    visible: false,
    type: 'info',
    title: '',
    message: '',
    ...initialState,
  });

  const showAlert = useCallback(({ type = 'info', title = '', message = '' } = {}) => {
    setAlertState({ visible: true, type, title, message });
  }, []);

  const hideAlert = useCallback(() => {
    setAlertState((prev) => ({ ...prev, visible: false }));
  }, []);

  const showError = useCallback((title, message) => showAlert({ type: 'error', title, message }), [showAlert]);

  const showSuccess = useCallback((title, message) => showAlert({ type: 'success', title, message }), [showAlert]);

  const showInfo = useCallback((title, message) => showAlert({ type: 'info', title, message }), [showAlert]);

  return {
    alertState,
    showAlert,
    hideAlert,
    showError,
    showSuccess,
    showInfo,
  };
};

export default useAlert;
