import Swal from 'sweetalert2';
import { api } from '../../services/api/api';
import './AddTask.scss';

const usersEndpoint = process.env.REACT_APP_ENDPOINT_USERS;

export const AddTask = () => {
  const userId = sessionStorage.getItem('userId');

  if (!userId) {
    Swal.fire({ icon: 'error', text: 'No hay usuario autenticado' });
    return;
  }

  Swal.fire({
    html: `
      <div style="margin-bottom: 10px;">
        <label for="swal-name" style="display: block; font-family:'Itim'; text-align: left; padding-bottom:15px;">Nombre</label>
        <input id="swal-name" class="swal2-input" placeholder="Nombre" style="width: 100%; margin: 0;">
      </div>

      <div style="margin-bottom: 10px;">
        <label for="swal-date" style="display: block; font-family:'Itim'; text-align: left; padding-bottom:15px;">Fecha de entrega</label>
        <input id="swal-date" type="date" class="swal2-input" placeholder="Fecha" style="width: 100%; margin: 0;">
      </div>

      <div style="margin-bottom: 10px;">
        <label for="swal-time" style="display: block; font-family:'Itim'; text-align: left; padding-bottom:15px;">Hora de entrega</label>
        <input id="swal-time" type="time" class="swal2-input" placeholder="Hora" style="width: 100%; margin: 0;">
      </div>

      <div style="margin-bottom: 10px;">
        <label for="swal-message" style="display: block; font-family:'Itim'; text-align: left; padding-bottom:15px;">Mensaje</label>
        <textarea id="swal-message" class="swal2-textarea" placeholder="Mensaje" style="width: 100%; margin: 0;"></textarea>
      </div>
    `,
    focusConfirm: false,
    confirmButtonText: 'Guardar',
    customClass: { confirmButton: 'addTask-accept-btn' },
    preConfirm: () => {
      const nameTask = document.getElementById('swal-name').value;
      const dateTask = document.getElementById('swal-date').value;
      const timeTask = document.getElementById('swal-time').value;
      const messageTask = document.getElementById('swal-message').value;

      if (!nameTask || !dateTask || !timeTask || !messageTask) {
        Swal.showValidationMessage(`Por favor completa todos los campos`);
        return false;
      }

      return { nameTask, dateTask, timeTask, messageTask };
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await api.post(`${usersEndpoint}/${userId}/tasks`, {
          name: result.value.nameTask,
          date: result.value.dateTask,
          time: result.value.timeTask,
          message: result.value.messageTask,
        });

        if (response.status >= 200 && response.status < 300) {
          Swal.fire({
            icon: 'success',
            title: 'Tarea creada',
            html: `
              <div style="text-align: left; margin-left: 5vw;">
                <p><strong>Nombre:</strong> ${result.value.nameTask}</p>
                <p><strong>Fecha:</strong> ${result.value.dateTask}</p>
                <p><strong>Hora:</strong> ${result.value.timeTask}</p>
                <p><strong>Mensaje:</strong> ${result.value.messageTask}</p>
              </div>
            `,
          });
        }
      } catch (error) {
        Swal.fire({ text: error.response?.data?.error?.message || error.message, icon: 'error' });
        console.error('Error al crear tarea:', error);
      }
    }
  });
};

export default AddTask;