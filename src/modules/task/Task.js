import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api/api';
import { Title } from '../../components/title/Title';
import { Button } from '../../components/button/Button.js';
import { FiStar } from "react-icons/fi";
import './Task.scss';

const usersEndpoint = process.env.REACT_APP_ENDPOINT_USERS;

export const Task = () => {
  const navigate = useNavigate();
  const { userId, taskId } = useParams(); // Se obtiene el token de la URL
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get(`${usersEndpoint}/${userId}/tasks/${taskId}`);
        setTask(response.data.task);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [taskId, userId]);

  const goToHome = () => {
    navigate('/home');
  };

  // fallback
  if (loading) {
    return (
      <div className="loader-overlay loader-overlay--home">
        <div className="loader-spinner"></div>
        <p className="loader-text">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="App-container">
      <div className="App-form">
        <div className="task-header">
          <div>
            <FiStar className='task-icon' strokeWidth={1} />
          </div>
          <div className="task-calendar">
            <p>Fecha de entrega:</p>
            <span className="task-datetime">{task.date}</span>
            <span className="task-datetime">{task.time}</span>
          </div>
        </div>
        <div className="task-data">
          {task ? (
            <div>
              <Title title={task.name} />
              <p className="task-message"> {task.message}</p>
            </div>
          ) : (
            <p>Cargando tarea...</p>
          )}
        </div>
        <Button label={'Regresar'} onClick={goToHome} />
      </div>
    </div>
  );
}

export default Task;