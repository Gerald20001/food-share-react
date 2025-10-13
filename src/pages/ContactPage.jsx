import { useTitle } from '../hooks/useTitle';
function ContactPage() {
  useTitle('Контакты');
  return (
    <div className="contact-page">
      <h1>Связаться с нами</h1>
      <p>Свяжитесь с FoodShare для сотрудничества или поддержки.</p>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Имя</label>
          <input type="text" id="name" name="name" placeholder="Ваше имя" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Ваш email" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Сообщение</label>
          <textarea id="message" name="message" placeholder="Ваше сообщение"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Отправить</button>
      </form>
    </div>
  );
}

export default ContactPage;