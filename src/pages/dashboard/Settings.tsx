import React from 'react';
    import { PageHeader } from '../../components/ui/PageHeader';
    import { Button } from '../../components/ui/Button';
    import { Input } from '../../components/ui/Input';
    import { Select } from '../../components/ui/Select';
    import { useUserStore } from '../../store/user';
    import { usePlansStore } from '../../store/plans';
    import { useNavigate } from 'react-router-dom';
    import { AddUserModal } from '../../components/users/AddUserModal';

    export function Settings() {
      const { currentUser, users, setCurrentUser, setPlanId } = useUserStore();
      const [newPhoto, setNewPhoto] = React.useState<File | null>(null);
      const plans = usePlansStore((state) => state.plans);
      const navigate = useNavigate();
      const [isAddUserModalOpen, setIsAddUserModalOpen] = React.useState(false);

      const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentUser) {
          setCurrentUser({ ...currentUser, name: e.target.value });
        }
      };

      const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentUser) {
          setCurrentUser({ ...currentUser, email: e.target.value });
        }
      };

      const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          setNewPhoto(file);
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result && currentUser) {
              const imageUrl = event.target.result as string;
              if (!imageUrl.startsWith('data:')) {
                setCurrentUser({ ...currentUser, photo: imageUrl });
              } else {
                setCurrentUser({ ...currentUser, photo: URL.createObjectURL(file) });
              }
            }
          };
          reader.readAsDataURL(file);
        }
      };

      const handleRemovePhoto = () => {
        setNewPhoto(null);
        if (currentUser) {
          setCurrentUser({ ...currentUser, photo: null });
        }
      };

      const handleSelectPlan = (planId: string) => {
        setPlanId(planId);
        navigate('/dashboard');
      };

      const handleAddUser = () => {
        setIsAddUserModalOpen(true);
      };

      return (
        <div className="space-y-6">
          <PageHeader 
            title="Configurações" 
            description="Gerencie as configurações do sistema"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Settings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Informações do Usuário</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <Input
                    placeholder="Digite seu nome"
                    value={currentUser?.name || ''}
                    onChange={handleNameChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    type="email"
                    placeholder="Digite seu email"
                    value={currentUser?.email || ''}
                    onChange={handleEmailChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Foto</label>
                  <Input type="file" accept="image/*" onChange={handlePhotoChange} />
                  {currentUser?.photo && (
                    <div className="relative mt-2">
                      <img
                        src={currentUser.photo}
                        alt="User"
                        className="h-20 w-20 rounded-full object-cover"
                      />
                      <Button
                        type="button"
                        onClick={handleRemovePhoto}
                        size="icon"
                        variant="ghost"
                        className="absolute top-0 right-0 text-red-600 hover:text-red-700"
                      >
                        <span className="sr-only">Remover foto</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Company Settings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Informações da Empresa</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome da Empresa</label>
                  <Input placeholder="Digite o nome da empresa" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CNPJ</label>
                  <Input placeholder="Digite o CNPJ" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input type="email" placeholder="Digite o email" />
                </div>
              </div>
            </div>

            {/* System Settings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Configurações do Sistema</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Idioma</label>
                  <Select defaultValue="pt-BR">
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Fuso Horário</label>
                  <Select defaultValue="America/Sao_Paulo">
                    <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                    <option value="America/New_York">New York (GMT-4)</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Moeda</label>
                  <Select defaultValue="BRL">
                    <option value="BRL">Real (R$)</option>
                    <option value="USD">Dollar ($)</option>
                  </Select>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Notificações</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notificações por email</span>
                  <input type="checkbox" className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notificações do sistema</span>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Segurança</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Senha atual</label>
                  <Input type="password" placeholder="Digite sua senha atual" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nova senha</label>
                  <Input type="password" placeholder="Digite a nova senha" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Confirmar nova senha</label>
                  <Input type="password" placeholder="Confirme a nova senha" />
                </div>
                <Button className="w-full">Atualizar senha</Button>
              </div>
            </div>

            {/* Plan Settings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Plano</h3>
              <div className="space-y-4">
                {plans.map((plan) => (
                  <div key={plan.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{plan.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(plan.price)} / {plan.billingCycle === 'monthly' ? 'mês' : 'ano'}
                        </p>
                      </div>
                      <Button
                        variant={currentUser?.planId === plan.id ? 'primary' : 'outline'}
                        onClick={() => handleSelectPlan(plan.id)}
                        size="sm"
                      >
                        {currentUser?.planId === plan.id ? 'Plano Ativo' : 'Selecionar'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add User Settings */}
            {currentUser?.email === 'aleanmendonca@gmail.com' && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Gerenciar Usuários</h3>
                <Button onClick={handleAddUser}>Adicionar Usuário</Button>
              </div>
            )}
          </div>
          
          <AddUserModal
            isOpen={isAddUserModalOpen}
            onClose={() => setIsAddUserModalOpen(false)}
          />
        </div>
      );
    }
