import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useOffers } from '../context/OfferContext';
import './NewOfferPage.css';

function NewOfferPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { addOffer } = useOffers();

  // Состояние для текстовых полей формы
  const [formData, setFormData] = useState({
    title: '',
    category: 'bakery',
    quantity: '',
    pickupTime: '',
    description: '',
  });
  
  // Состояния для файла изображения и его URL для предпросмотра
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Эффект для очистки временного URL изображения, чтобы избежать утечек памяти
  useEffect(() => {
    // Эта функция-очистка сработает, когда компонент будет "размонтирован" (убран со страницы)
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);


  // Обработчик для текстовых полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Обработчик для поля выбора файла
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Если есть старый URL предпросмотра, очищаем его
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      // Создаем новый временный URL для предпросмотра
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Обработчик отправки всей формы
  const handleSubmit = (e) => {
    e.preventDefault();
    // Простая валидация: проверяем, что фото загружено
    if (!imageFile) {
      addToast('Пожалуйста, загрузите фото', 'error');
      return;
    }
    
    // В реальном приложении мы бы загрузили `imageFile` на сервер и получили постоянный URL.
    // В нашем моковом варианте мы просто передаем временный URL предпросмотра дальше.
    const fullOfferData = {
      ...formData,
      imageUrl: imagePreview
    };

    addOffer(fullOfferData);
    addToast('Объявление успешно создано!');
    navigate('/dashboard');
  };

  return (
    <div className="form-page-container">
      <h1 className="form-page-title">Новое объявление</h1>
      <p className="form-page-subtitle">Заполните детали, чтобы поделиться едой</p>
      
      <form className="offer-form" onSubmit={handleSubmit}>
        
        <div className="form-field">
          <label htmlFor="image-upload" className="file-upload-label">
            {imagePreview ? 'Нажмите, чтобы изменить фото' : 'Нажмите, чтобы загрузить фото'}
          </label>
          <input
            type="file"
            id="image-upload"
            className="file-upload-input"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
          />
          {imagePreview && <img src={imagePreview} alt="Предпросмотр" className="image-preview" />}
        </div>
        
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
          <button type="submit" className="btn btn-primary">Создать объявление</button>
        </div>
      </form>
    </div>
  );
}

export default NewOfferPage;