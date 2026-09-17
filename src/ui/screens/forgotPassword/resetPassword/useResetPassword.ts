import { ErrorCode, getApiErrorCode, getErrorMessage } from '@/app/errors/apiErrors';
import { toast } from '@/app/libs/sonner';
import { AuthService } from '@/app/services/AuthService';
import { resetPasswordSchema, ResetPasswordSchema } from '@/ui/screens/forgotPassword/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IUseResetPassword {
  email: string;
}

const RESEND_COOLDOWN_SECONDS = 30;

export function useResetPassword({ email }: IUseResetPassword) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(RESEND_COOLDOWN_SECONDS);
  const [isResending, setIsResending] = useState(false);

  const {
    control,
    handleSubmit: RHFHandleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, isValid },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      confirmationCode: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = RHFHandleSubmit(async (data) => {
    try {
      await AuthService.confirmationForgotPassword({
        email,
        confirmationCode: data.confirmationCode,
        password: data.password,
      });

      setIsSuccess(true);
    } catch (error) {
      const code = getApiErrorCode(error);

      if (code === ErrorCode.BAD_REQUEST) {
        setError('confirmationCode', {
          type: 'api',
          message: 'Código inválido ou expirado. Tente novamente.',
        });
      } else {
        setError('root.api', { message: getErrorMessage(code) });
      }
    }
  });

  useEffect(() => {
    if (resendCountdown <= 0 || isResending) {
      return;
    }

    const timer = setTimeout(() => {
      setResendCountdown((seconds) => seconds - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCountdown, isResending]);

  const handleResendCode = async () => {
    if (resendCountdown > 0 || isResending) {
      return;
    }

    setIsResending(true);

    try {
      await AuthService.forgotPassword({ email });
      setResendCountdown(RESEND_COOLDOWN_SECONDS);
      toast.success('Novo código enviado para o seu e-mail');
    } catch (error) {
      const code = getApiErrorCode(error);
      toast.error(getErrorMessage(code));
    } finally {
      setIsResending(false);
    }
  };

  const canResend = resendCountdown === 0 && !isResending;

  return {
    control,
    handleSubmit,
    handleResendCode,
    clearErrors,
    isSubmitting,
    isValid,
    isSuccess,
    resendCountdown,
    isResending,
    canResend,
  };
}
