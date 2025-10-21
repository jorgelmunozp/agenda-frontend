import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api/api';
import { Title } from '../../components/title/Title';
import { FiStar } from "react-icons/fi";
import './Task.scss';

export const Task = () => {
  const navigate = useNavigate();
  const { userId, taskId } = useParams();      // 👈 obtiene el token de la URL
  const [task, setTask] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get(`/users/${userId}/tasks/${taskId}`);
        setTask(response.data.task);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTasks();
  }, [taskId, userId]);

  const goToHome = () => {
    navigate('/home');
  };

  return (
      <div className="task-container">
        <div className="task-form">
          <div className='task-header'>
            <div><FiStar size={50} strokeWidth={1} /></div>
            <div className='task-calendar'><p>Fecha de entrega:</p><span className='task-datetime'>{task.date}</span><span className='task-datetime'>{task.time}</span></div>
          </div>
          <div className='task-data'>
            {task ? ( <div>
                        <Title title={task.name} />
                        <p className='task-message'> {task.message}</p>
                      </div> ) 
                  : ( <p>Cargando tarea...</p> )
            }
          </div>
          <button className="task-button" onClick={goToHome}>
            Regresar
          </button>
        </div>
      </div>
  );
}

export default Task;