import { useState, useEffect } from 'react';
import { api } from '../../services/api/api';
import { Input } from '../../components/input/Input';
import { Label } from '../../components/label/Label';
import { Button } from '../../components/button/Button';
import { AppAlert } from '../../components/alert/AppAlert';
import { Loading } from '../../components/loading/Loading';
import { useAlert } from '../../hooks/useAlert';
import './AddTask.scss';

const usersEndpoint = process.env.REACT_APP_ENDPOINT_USERS;

export const AddTask = ({ visible = false, onClose, onSaved, userId: propUserId }) => {
  const [item, setItem] = useState({
    name: '',
    date: '',
    time: '',
    message: '',
  });

  const [saving, setSaving] = useState(false);

  const { alertState, showError, showSuccess, hideAlert } = useAlert();

  const userId = propUserId || sessionStorage.getItem('userId');

  // Bloquea scroll del body cuando el modal está abierto
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const originalOverflow = document.body.style.overflow;

    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [visible]);

  const handleChange = (key, value) => {
    setItem((prev) => ({ ...prev, [key]: value }));
  };

  const handleNewTask = async () => {
    if (!userId) {
      showError('Sin usuario', 'No hay usuario autenticado.');
      return;
    }

    if (!item.name || !item.date || !item.time || !item.message) {
      showError('Formulario incompleto', 'Por favor completa todos los campos.');
      return;
    }

    try {
      setSaving(true);

      const response = await api.post(`${usersEndpoint}/${userId}/tasks`, item);

      if (response.status >= 200 && response.status < 300) {
        if (typeof onSaved === 'function') {
          await onSaved();
        }

        setItem({ name: '', date: '', time: '', message: '' });

        if (typeof onClose === 'function') onClose();

        showSuccess('Tarea registrada', 'La tarea se guardó correctamente.');
      }
    } catch (error) {
      const msg = error?.response?.data?.error?.message || error.message || 'Error registrando tarea.';
      showError('Error', msg);
      console.error('Error registrando tarea:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleOverlayClick = () => {
    if (typeof onClose === 'function') onClose();
  };

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <>
      {visible && (
        <div className="add-task-overlay" onClick={handleOverlayClick}>
          <div className="add-task-modal" onClick={stopPropagation}>
            {saving ? (
              <Loading label={'Registrando tarea...'} />
            ) : (
              <div className="add-task-form">
                <div className="add-task-field">
                  <Label text="Nombre" textShadow={2} />
                  <Input placeholder="Nombre" value={item.name} type="text" setState={(v) => handleChange('name', v)} />
                </div>

                <div className="add-task-field">
                  <Label text="Fecha de entrega" textShadow={2} />
                  <Input placeholder="Fecha" value={item.date} type="date" setState={(v) => handleChange('date', v)} />
                </div>

                <div className="add-task-field">
                  <Label text="Hora de entrega" textShadow={2} />
                  <Input placeholder="Hora" value={item.time} type="time" setState={(v) => handleChange('time', v)} />
                </div>

                <div className="add-task-field">
                  <Label text="Mensaje" textShadow={2} />
                  <Input placeholder="Mensaje" value={item.message} multiline rows={3} setState={(v) => handleChange('message', v)} />
                </div>

                <div className="add-task-actions">
                  <Button label="Guardar" type={1} onClick={handleNewTask} disabled={saving} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <AppAlert visible={alertState.visible} type={alertState.type} title={alertState.title} message={alertState.message} onClose={hideAlert} />
    </>
  );
};

export default AddTask;
