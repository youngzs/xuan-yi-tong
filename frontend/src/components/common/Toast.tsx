import React from 'react';
import { XCircle, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          icon: <CheckCircle className="w-5 h-5 text-green-500" />
        };
      case 'error':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          icon: <XCircle className="w-5 h-5 text-red-500" />
        };
      case 'warning':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          icon: <AlertCircle className="w-5 h-5 text-yellow-500" />
        };
      default:
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          icon: <Info className="w-5 h-5 text-blue-500" />
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div className={`${styles.bg} p-4 rounded-md shadow-lg flex items-center space-x-3`}>
      {styles.icon}
      <p className={`${styles.text} text-sm`}>{message}</p>
      <button onClick={onClose} className="ml-auto">
        <XCircle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
      </button>
    </div>
  );
};

export default Toast; 