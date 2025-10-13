import { useState, useEffect } from 'react';

// Этот хук принимает значение (которое быстро меняется) и задержку в миллисекундах
export function useDebounce(value, delay) {
  // Состояние для "отложенного" значения
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Устанавливаем таймер, который обновит состояние через `delay` мс
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Это функция-очистка: если `value` изменится снова (пользователь напечатает еще букву),
    // мы отменим предыдущий таймер и запустим новый.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Эффект перезапускается, только если `value` или `delay` изменились

  // Возвращаем "стабильное" значение, которое обновляется с задержкой
  return debouncedValue;
}