import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface CreateClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateClientModal({ isOpen, onClose }: CreateClientModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Novo Cliente</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <Input required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input type="email" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Telefone</label>
                <Input required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CPF/CNPJ</label>
                <Input required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Cliente
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
