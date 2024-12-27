import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import { z } from 'zod';
    import { AuthLayout } from '../../components/auth/AuthLayout';
    import { Input } from '../../components/ui/Input';
    import { Button } from '../../components/ui/Button';
    import { useUserStore } from '../../store/user';

    const registerSchema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6),
    });

    type RegisterForm = z.infer<typeof registerSchema>;

    export function Register() {
      const navigate = useNavigate();
      const [isLoading, setIsLoading] = React.useState(false);
      const { setName, setEmail } = useUserStore();

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
      });

      const onSubmit = async (data: RegisterForm) => {
        setIsLoading(true);
        
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        setName(data.name);
        setEmail(data.email);
        navigate('/select-plan');

        setIsLoading(false);
      };

      return (
        <AuthLayout title="Criar Conta">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Nome"
                  {...register('name')}
                  error={errors.name?.message}
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                  error={errors.email?.message}
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Senha"
                  {...register('password')}
                  error={errors.password?.message}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Criar Conta
            </Button>
          </form>
        </AuthLayout>
      );
    }
