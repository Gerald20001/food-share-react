import './Loading.css';

function Loading() {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
}

// ИСПРАВЛЕНИЕ: Добавляем эту строку, чтобы компонент можно было импортировать
export default Loading;