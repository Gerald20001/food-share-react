import './Toast.css';

function Toast({ message, type }) {
  return (
    <div className={`toast toast-${type}`} role="alert">
      <p className="toast-message">{message}</p>
    </div>
  );
}

export default Toast;