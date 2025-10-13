import { Link } from 'react-router-dom';
import { useTitle } from '../hooks/useTitle';
import './NotFoundPage.css';

function NotFoundPage() {
  useTitle('Страница не найдена');
  return (
    <div className="not-found-container">
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">Страница не найдена</h2>
      <p className="not-found-message">
        Ой! Похоже, вы свернули не туда. Страницы, которую вы ищете, не существует.
      </p>
      <Link to="/" className="btn btn-primary">
        Вернуться на главную
      </Link>
    </div>
  );
}

export default NotFoundPage;