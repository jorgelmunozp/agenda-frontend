import { useEffect, useState } from 'react';
import { FiPlus, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components/title/Title';
import { Pagination } from '../../components/pagination/Pagination';
import { api } from '../../services/api/api';
import { AddTask } from '../task/AddTask';
import './Home.scss';

const usersEndpoint = process.env.REACT_APP_ENDPOINT_USERS;

export const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({ last_page: 2, limit: 5, page: 1, total: 0 });

  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get(`${usersEndpoint}/${userId}/tasks?page=${pagination.page}&limit=${pagination.limit}`);
        const data = response?.data?.data || [];
        setTasks(data);

        const meta = response?.data?.meta;
        if (JSON.stringify(meta) !== JSON.stringify(pagination)) {
          setPagination(meta);
        }
      } catch (error) {
        console.error('Error fetching data: ', error.response?.data || error.message);
        setTasks([]);
      }
    };

    fetchTasks();
  }, [pagination, navigate, userId]);

  const handleOpenTask = (taskId) => {
    navigate(`/users/${userId}/tasks/${taskId}`);
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.last_page) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  return (
    <div className="view-container">
      <div className="home-form">
        <div className="home-header">
          <Title title="TAREAS" />
          <button onClick={AddTask}>
            <FiPlus />
          </button>
        </div>

        <ul>
          {tasks.map((task, index) => (
            <div key={index} className="home-list">
              <FiStar />
              <button onClick={() => handleOpenTask(task.id)} className="home-task-item">
                <li>{task.task.name}</li>
                <li>
                  <span>
                    {task.task.date} - {task.task.time}
                  </span>
                </li>
              </button>
            </div>
          ))}
        </ul>

        <Pagination page={pagination.page} lastPage={pagination.last_page} onPrev={handlePrevPage} onNext={handleNextPage} />
      </div>
    </div>
  );
};

export default Home;
