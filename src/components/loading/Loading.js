import './Loading.scss';

export const Loading = ({ label }) => {
  return (
    <div className="loader-overlay loader-overlay--home">
      <div className="loader-spinner"></div>
      <p className="loader-text">{ label }</p>
    </div>
  );
}
