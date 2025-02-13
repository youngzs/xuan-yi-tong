import { useState } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  message: string;
  type: ToastType;
  id: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();
    const toast = { message, type, id };
    
    setToasts(prev => [...prev, toast]);

    // 3秒后自动移除
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  return {
    toasts,
    showToast
  };
}; 