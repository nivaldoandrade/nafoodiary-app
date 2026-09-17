import { ApiError, getApiErrorCode, getErrorMessage } from '@/app/errors/apiErrors';
import { AuthService } from '@/app/services/AuthService';
import { AuthStackNavigatorProps } from '@/app/navigation/AuthStack';
import { forgotPasswordSchema, ForgotPasswordSchema } from '@/ui/screens/forgotPassword/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';

export function useForgotPassword() {
  const navigation = useNavigation<AuthStackNavigatorProps>();

  const {
    control,
    handleSubmit: RHFHandleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, isValid },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const handleSubmit = RHFHandleSubmit(async (data) => {
    try {
      await AuthService.forgotPassword({ email: data.email });
      navigation.navigate('ResetPassword', { email: data.email });
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        const code = getApiErrorCode(error);
        setError('root.api', { message: getErrorMessage(code) });
      }
    }
  });

  return {
    control,
    handleSubmit,
    isSubmitting,
    isValid,
    clearErrors,
  };
}
