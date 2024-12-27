import React, { useState } from 'react';

    type ToastType = 'success' | 'error' | 'info';

    interface Toast {
      id: string;
      title: string;
      description?: string;
      type: ToastType;
    }

    interface ToastContextType {
      toasts: Toast[];
      toast: (toast: Omit<Toast, 'id'>) => void;
      removeToast: (id: string) => void;
    }

    const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

    export function ToastProvider({ children }: { children: React.ReactNode }) {
      const [toasts, setToasts] = useState<Toast[]>([]);

      const toast = (toast: Omit<Toast, 'id'>) => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { ...toast, id }]);
        setTimeout(() => removeToast(id), 5000);
      };

      const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      };

      const value = React.useMemo(() => ({
        toasts,
        toast,
        removeToast,
      }), [toasts]);

      return (
        <ToastContext.Provider value={value}>
          {children}
          <div className="fixed top-4 right-4 space-y-2 z-50">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className={`p-4 rounded-md shadow-lg ${
                  toast.type === 'success'
                    ? 'bg-green-100 text-green-800'
                    : toast.type === 'error'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                <h4 className="font-medium">{toast.title}</h4>
                {toast.description && <p className="text-sm">{toast.description}</p>}
              </div>
            ))}
          </div>
        </ToastContext.Provider>
      );
    }

    export function useToast() {
      const context = React.useContext(ToastContext);
      if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
      }
      return context;
    }
