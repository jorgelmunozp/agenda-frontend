import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../components/Title';
import { Input } from '../components/Input';
import { FiStar, FiPlus, FiSearch } from "react-icons/fi";
import { api } from '../services/api';
import Swal from 'sweetalert2';
import '../assets/styles/scss/Home.scss';

 const userId = sessionStorage.getItem('userId');    // Get user Id from sessionStorage

 const handleNewTask = () => {
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
      confirmButtonText: "Crear",
      customClass: {
        confirmButton: 'home-accept-btn', // clase CSS personalizada
      },
      preConfirm: () => {
        const nameTask = document.getElementById('swal-name').value;
        const dateTask = document.getElementById('swal-date').value;
        const timeTask = document.getElementById('swal-time').value;
        const messageTask = document.getElementById('swal-message').value;

        if (!nameTask || !dateTask || !timeTask || !messageTask) {
          Swal.showValidationMessage(`Por favor completa todos los campos`);
          return false; // evita cerrar el modal
        }

        return { nameTask, dateTask, timeTask, messageTask };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Tarea creada:", result.value);
        try {
            const response = await api.post(`/users/${userId}/tasks`, {
                name: result.value.nameTask,
                date: result.value.dateTask,
                time: result.value.timeTask,
                message: result.value.messageTask,
            });

            // Si es exitoso, redirige a home
            if (200 <= response.status && response.status <= 299) { 
                console.log(response.data);
                Swal.fire({
                  icon: "success",
                  title: "Tarea creada",
                  html: `
                    <div style="text-align: left; margin-left: 5vw;">
                      <p><strong>Nombre:</strong> ${result.value.nameTask}</p>
                      <p><strong>Fecha:</strong> ${result.value.dateTask}</p>
                      <p><strong>Hora:</strong> ${result.value.timeTask}</p>
                      <p><strong>Mensaje:</strong> ${result.value.messageTask}</p>
                    </div>
                  `
                });
            }

        } catch (error) {
            Swal.fire({
                text: error.response?.data.error.message || error.message,
                icon: "error"        
            });
            console.error('Error user login: ', error.response?.data || error.message);
        }
      }
    });
  }



  const handleOpenTask = (navigate, taskId) => {
    navigate(`/users/${userId}/tasks/${taskId}`);
  }


// ********** Home Page ********** //
export const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [queryTaskName, setQueryTaskName] = useState("");
  const [pagination, setPagination] = useState({
    last_page: 1,
    limit: 5,
    page: 1,
    total: 0,
  });
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Interceptor para agregar token dinámicamente
        api.interceptors.request.use(config => {
          const token = sessionStorage.getItem('token'); // o donde guardes tu token
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        }, error => Promise.reject(error));


        const response = await api.get(`/users/${userId}/tasks?${queryTaskName}`);
        console.log('Response.data:', response.data);
        setTasks(response.data.data);
        setPagination(response.data.meta);
        console.log('Pagination info:', pagination);
      } catch (error) {
        // Revisamos si hay respuesta del backend
        if (error.response && error.response.data && error.response.data.error) {
          console.error(error.response.data.error.message);
        } else {
          console.error('Error fetching tasks');
        }
        setTasks([]); // limpiar lista de tareas si hay error
      }
    };

    fetchTasks();
  }, [queryTaskName,pagination]);

  return (
      <div className="home-container">
        <div className="home-form">
          <div className='home-header'>
            <Title title="TAREAS" />
            <button onClick={handleNewTask}><FiPlus /></button>
          </div>
          <div className='home-search'>
            { tasks.length === 0 ? (<p>No tienes tareas</p> ) 
                                 : <Input Icon={FiSearch} type={'search'} value={queryTaskName} setState={setQueryTaskName} /> 
            }
          </div>
          <ul>
            {tasks.filter( task => task.task.name.toLowerCase().includes(queryTaskName.toLowerCase()) ).map((task, index) => (
              <div key={index} className='home-list'>
                <FiStar /> 
                <>
                  <button onClick={() => handleOpenTask(navigate,task.id)} className='home-button-task'>
                    <li>{task.task.name}</li>
                    <li><span>{task.task.date} - {task.task.time}</span></li>
                  </button>
                </>
              </div>
            ))}
          </ul>
        </div>
      </div>
  );
}

export default Home;