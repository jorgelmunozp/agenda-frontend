import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import './Pagination.scss';

export const Pagination = ({ page, lastPage, onPrev, onNext }) => {
  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={onPrev} className="page-btn">
        <FiArrowLeft className="icon" />
        <span className="pagination-label">Anterior</span>
      </button>

      <span>
        Página {page} de {lastPage}
      </span>

      <button disabled={page === lastPage} onClick={onNext} className="page-btn">
        <span className="pagination-label">Siguiente</span>
        <FiArrowRight className="icon" />
      </button>
    </div>
  );
};

export default Pagination;
