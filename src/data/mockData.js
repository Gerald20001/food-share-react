// Импортируем картинки
import breadImage from '../assets/user2.png';
import veggiesImage from '../assets/user4.png';
import milkImage from '../assets/user3.png';

// Аватары и обложки
import user1Avatar from '../assets/user5.png';
import user1Cover from '../assets/user3.png';
import user2Avatar from '../assets/user2.png';
import user2Cover from '../assets/user3.png';

export const offers = [
  { 
    id: 1, 
    userId: 1, 
    title: 'Fresh Bread', 
    category: 'bakery', 
    status: 'Active', 
    location: "Bakery 'Dobro'", 
    position: [49.2331, 28.4682], 
    imageUrl: breadImage, 
    description: 'Leftover fresh bread and croissants after closing. Perfect for dinner.', 
    specs: ['Type: Bakery', 'Amount: ~5 kg', 'Pick up before: 20:00'] 
  },
  
  { 
    id: 2, 
    userId: 2, 
    title: 'Fresh Vegetables', 
    category: 'produce', 
    status: 'Active', 
    location: "Market 'Central'", 
    position: [49.2300, 28.4700], 
    imageUrl: veggiesImage, 
    description: 'Fresh seasonal vegetables from local farmers. Mostly tomatoes, cucumbers and greens.', 
    specs: ['Type: Vegetables', 'Amount: 1 crate', 'Pick up before: 18:00'] 
  },
  
  { 
    id: 3, 
    userId: 1, 
    title: 'Dairy Products', 
    category: 'dairy', 
    status: 'Active', 
    location: "Bakery 'Dobro'", 
    position: [49.2355, 28.4655], 
    imageUrl: milkImage, 
    description: 'Yogurts and milk expiring tomorrow. Everything is sealed.', 
    specs: ['Type: Dairy', 'Amount: 1 package', 'Pick up before: 22:00'] 
  },
  
  { 
    id: 99, 
    userId: 2, 
    title: 'Apples from the Garden (far away)', 
    category: 'produce', 
    status: 'Active', 
    location: "Yakushyntsi village", 
    position: [49.268, 28.325], 
    imageUrl: veggiesImage, 
    description: 'Lots of garden apples, self pickup.', 
    specs: ['Type: Vegetables and fruits', 'Amount: 2 buckets', 'Pick up before: 20:00'] 
  },
];

export const users = {
  '1': {
    name: "Bakery 'Dobro'",
    isVerified: true,
    avatarUrl: user1Avatar,
    coverUrl: user1Cover,
    description: "We are a small family bakery in the city center. Every evening we have leftover baked goods that we gladly give away so they don’t go to waste.",
    stats: { offers: 28, reviews: 15, rating: 4.8 },
    reviews: [
      { from: "Olga", rating: 5, comment: "Thank you so much for the bread! Always fresh and very tasty." },
      { from: "Andrey", rating: 4, comment: "Sometimes there's a line, but it's worth it." }
    ]
  },

  '2': {
    name: "Market 'Central'",
    isVerified: false,
    avatarUrl: user2Avatar,
    coverUrl: user2Cover,
    description: "The biggest food market in the city. At the end of the day sellers are ready to share leftover fresh vegetables and fruits.",
    stats: { offers: 15, reviews: 8, rating: 4.5 },
    reviews: [
      { from: "Maria", rating: 5, comment: "Very convenient to pick up after work, always fresh products." }
    ]
  },

  '101': {
    name: "Ivan the Volunteer",
    isVerified: false,
    avatarUrl: 'https://i.pravatar.cc/150?u=volunteer',
    coverUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2940&auto=format&fit=crop', 
    description: "I help the community in my free time. Ready to pick up food in the central district.",
    stats: { offers: 0, reviews: 3, rating: 5.0 }, 
    reviews: [
      { from: "Bakery 'Dobro'", rating: 5, comment: "Ivan is always on time and very polite!" }
    ]
  }
};
