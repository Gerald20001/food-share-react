// Импортируем картинки один раз здесь
import breadImage from '../assets/user3.png';
import veggiesImage from '../assets/user2.png';
import milkImage from '../assets/user5.png';

// Аватары и обложки для пользователей
import user1Avatar from '../assets/user3.png';
import user1Cover from '../assets/user2.png';
import user2Avatar from '../assets/user3.png'; // <-- Новый аватар
import user2Cover from '../assets/user4.png'; // <-- Новая обложка


export const offers = [
  // Это объявление от Пекарни (userId: 1)
  { id: 1, userId: 1, title: 'Свежий хлеб', location: "Пекарня 'Добро'", position: [49.2331, 28.4682], imageUrl: breadImage, description: 'Остатки свежего хлеба и круассанов после закрытия. Идеально для ужина.', specs: ['Тип: Выпечка', 'Количество: ~5 кг', 'Забрать до: 20:00'] },
  
  // ИЗМЕНЕНИЕ: Это объявление теперь от Рынка (userId: 2)
  { id: 2, userId: 2, title: 'Свежие овощи', location: "Рынок 'Центральный'", position: [49.2300, 28.4700], imageUrl: veggiesImage, description: 'Свежие сезонные овощи от местных фермеров. В основном помидоры, огурцы и зелень.', specs: ['Тип: Овощи', 'Количество: 1 ящик', 'Забрать до: 18:00'] },
  
  // Это объявление снова от Пекарни (userId: 1)
  { id: 3, userId: 1, title: 'Молочные продукты', location: "Пекарня 'Добро'", position: [49.2355, 28.4655], imageUrl: milkImage, description: 'Йогурты и молоко, срок годности которых истекает завтра. Все герметично упаковано.', specs: ['Тип: Молочное', 'Количество: 1 пакет', 'Забрать до: 22:00'] },
];

export const users = {
  // Пользователь 1
  '1': {
    name: "Пекарня 'Добро'",
    isVerified: true,
    avatarUrl: user1Avatar,
    coverUrl: user1Cover,
    description: "Мы - небольшая семейная пекарня в центре города. Каждый вечер у нас остаются свежие хлебобулочные изделия, которые мы с радостью отдаем, чтобы они не пропадали.",
    stats: { offers: 28, reviews: 15, rating: 4.8 },
    reviews: [
      { from: "Ольга", rating: 5, comment: "Спасибо огромное за хлеб! Всегда свежий и очень вкусный." },
      { from: "Андрей", rating: 4, comment: "Иногда бывает очередь, но это того стоит." }
    ]
  },
  // ИЗМЕНЕНИЕ: Добавляем нового пользователя 2
  '2': {
    name: "Рынок 'Центральный'",
    isVerified: false,
    avatarUrl: user2Avatar,
    coverUrl: user2Cover,
    description: "Крупнейший продуктовый рынок города. В конце дня продавцы готовы поделиться остатками свежих овощей и фруктов.",
    stats: { offers: 15, reviews: 8, rating: 4.5 },
    reviews: [
      { from: "Мария", rating: 5, comment: "Очень удобно забирать после работы, всегда свежие продукты." }
    ]
  }
};