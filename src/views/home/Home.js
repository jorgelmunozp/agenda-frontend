import { useEffect, useState } from 'react';
import { FiPlus, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/loading/Loading.js';
import { Pagination } from '../../components/pagination/Pagination.js';
import { Title } from '../../components/title/Title.js';
import { api } from '../../services/api/api.js';
import { AddTask } from './AddTask.js';
import './Home.scss';

const usersEndpoint = process.env.REACT_APP_ENDPOINT_USERS;

export const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({ last_page: 2, limit: 5, page: 1, total: 0 });
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
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

  // fallback
  if (loading) {
    return <Loading label={'Cargando tareas...'} />;
  }

  return (
    <div className="App-container logged">
      <div className="App-form">
        <div className="home-header">
          <Title title="TAREAS" />
          <button onClick={AddTask}>
            <FiPlus />
          </button>
        </div>
        <div className="home-container">
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
    </div>
  );
};

export default Home;
