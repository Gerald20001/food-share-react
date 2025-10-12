import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useOffers } from '../context/OfferContext';
import NotFoundPage from './NotFoundPage';
import './NewOfferPage.css'; // Переиспользуем стили

function EditOfferPage() {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { getOfferById, updateOffer } = useOffers();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const offerToEdit = getOfferById(offerId);
    if (offerToEdit) {
      setFormData(offerToEdit);
    }
  }, [offerId, getOfferById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOffer(formData.id, formData);
    addToast('Объявление успешно обновлено!');
    navigate('/dashboard');
  };

  if (!formData) {
    const offerExists = getOfferById(offerId);
    if (!offerExists) return <NotFoundPage />;
    return <div>Загрузка...</div>;
  }

  return (
    <div className="form-page-container">
      <h1 className="form-page-title">Редактировать объявление</h1>
      <p className="form-page-subtitle">Измените детали вашего объявления</p>
      
      <form className="offer-form" onSubmit={handleSubmit}>
        {/* ИСПРАВЛЕНИЕ: Добавляем все поля */}
        <div className="form-field">
          <label htmlFor="title">Название</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="form-field">
          <label htmlFor="category">Категория</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange}>
            <option value="bakery">Выпечка</option>
            <option value="produce">Овощи и фрукты</option>
            <option value="dairy">Молочные продукты</option>
            <option value="other">Другое</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="quantity">Количество (например, 2 кг, 1 ящик)</label>
          <input type="text" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </div>
        
        <div className="form-field">
          <label htmlFor="pickupTime">Забрать до (время)</label>
          <input type="text" id="pickupTime" name="pickupTime" value={formData.pickupTime} onChange={handleChange} required />
        </div>

        <div className="form-field">
          <label htmlFor="description">Описание</label>
          <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} required></textarea>
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Отмена</button>
          <button type="submit" className="btn btn-primary">Сохранить изменения</button>
        </div>
      </form>
    </div>
  );
}

export default EditOfferPage;