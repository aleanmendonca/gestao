import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { InfoTab } from './create-sale/InfoTab';
import { ProductsTab } from './create-sale/ProductsTab';
import { PaymentTab } from './create-sale/PaymentTab';

interface CreateSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'info' | 'products' | 'payment';

export function CreateSaleModal({ isOpen, onClose }: CreateSaleModalProps) {
  const [activeTab, setActiveTab] = React.useState<TabType>('info');
  const [formData, setFormData] = React.useState({
    info: {},
    products: [],
    payment: {}
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  const updateFormData = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const tabs = [
    { id: 'info', label: 'Informações' },
    { id: 'products', label: 'Produtos' },
    { id: 'payment', label: 'Pagamento' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Nova Venda</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`
                  px-4 py-2 text-sm font-medium border-b-2 
                  ${activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            {activeTab === 'info' && (
              <InfoTab data={formData} onChange={updateFormData} />
            )}
            {activeTab === 'products' && (
              <ProductsTab data={formData} onChange={updateFormData} />
            )}
            {activeTab === 'payment' && (
              <PaymentTab data={formData} onChange={updateFormData} />
            )}
          </div>

          <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Registro
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
