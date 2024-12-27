import React from 'react';
    import { User, Mail, Phone, FileText, Trash2, Edit } from 'lucide-react';
    import { Button } from '../../ui/Button';
    import { useClientsStore, Client } from '../../../store/clients';
    import { format } from 'date-fns';
    import { ptBR } from 'date-fns/locale';
    import { EditClientModal } from '../EditClientModal';

    interface ClientCardProps {
      client: Client;
    }

    export function ClientCard({ client }: ClientCardProps) {
      const deleteClient = useClientsStore((state) => state.deleteClient);
      const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

      const handleDelete = () => {
        if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
          deleteClient(client.id);
        }
      };

      return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="space-y-4 flex-1">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <span className="font-medium">{client.name}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span>{client.email}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span>{client.phone}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <span>{client.document}</span>
              </div>

              <div className="text-sm text-gray-500">
                Cadastrado em: {format(new Date(client.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </div>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                client.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {client.status === 'active' ? 'Ativo' : 'Inativo'}
              </span>
              <span className="text-sm text-gray-500">
                {client.type === 'individual' ? 'Pessoa Física' : 'Pessoa Jurídica'}
              </span>
              
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {client.address.street}, {client.address.number}
              {client.address.complement && ` - ${client.address.complement}`}
              <br />
              {client.address.neighborhood} - {client.address.city}/{client.address.state}
              <br />
              CEP: {client.address.zipCode}
            </p>
          </div>

          <EditClientModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            client={client}
          />
        </div>
      );
    }
