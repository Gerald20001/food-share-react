import { useEffect } from 'react';

const defaultTitle = 'FoodShare | Connecting Communities';

export function useTitle(title) {
  useEffect(() => {
    // Устанавливаем новый заголовок, если он есть
    document.title = title ? `${title} | FoodShare` : defaultTitle;

  
    return () => {
      document.title = defaultTitle;
    };
  }, [title]); // Эффект сработает, только когда изменится `title`
}