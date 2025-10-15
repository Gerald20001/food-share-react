import { useState, useCallback } from 'react';

export function useAsyncAction(action) {
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(async (...args) => {
    setIsLoading(true);
    try {
      // Имитируем задержку сети, чтобы увидеть спиннер
      await new Promise(resolve => setTimeout(resolve, 700)); 

      const result = await action(...args);
      return result;
    } catch (error) {
      console.error("Ошибка при выполнении действия:", error);
    } finally {
      setIsLoading(false);
    }
  }, [action]);

  return { execute, isLoading };
}