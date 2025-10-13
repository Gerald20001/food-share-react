import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner/Spinner';
import './NewOfferPage.css'; // Переиспользуем стили от страницы создания оффера

function EditProfilePage() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({ name: '', description: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');

  // Заполняем форму данными текущего пользователя при первой загрузке
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        description: user.description || '',
      });
      setAvatarPreview(user.avatarUrl);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const updatedData = { ...formData, avatarUrl: avatarPreview };
    const updatedUser = await updateUser(updatedData);
    setIsLoading(false);
    navigate(`/profile/${updatedUser.id}`);
  };

  if (!user) {
    return <div>Загрузка профиля...</div>;
  }

  return (
    <div className="form-page-container">
      <h1 className="form-page-title">Редактировать профиль</h1>

      <form className="offer-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Фото профиля</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={avatarPreview} alt="Предпросмотр" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
            <label htmlFor="avatar-upload" className="btn btn-secondary">
              Загрузить
            </label>
            <input type="file" id="avatar-upload" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="name">Имя / Название</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-field">
          <label htmlFor="description">Описание</label>
          <textarea id="description" name="description" rows="5" value={formData.description} onChange={handleChange}></textarea>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(`/profile/${user.id}`)}>Отмена</button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfilePage;