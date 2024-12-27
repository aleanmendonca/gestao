import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { SignIn } from '@clerk/clerk-react';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginForm = z.infer<typeof loginSchema>;

const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123',
};

export function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError('');

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (
      data.email === ADMIN_CREDENTIALS.email &&
      data.password === ADMIN_CREDENTIALS.password
    ) {
      // TODO: Set authentication state
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }

    setIsLoading(false);
  };

  return (
    <AuthLayout title="Login">
        <SignIn />
    </AuthLayout>
  );
}
