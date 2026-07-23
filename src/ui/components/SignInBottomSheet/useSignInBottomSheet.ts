import { useAuth } from '@/app/contexts/AuthContext/useAuth';
import { ApiError, getErrorMessage } from '@/app/errors/apiErrors';
import { ISignInBottomSheet } from '@/ui/components/SignInBottomSheet/ISignInBottomSheet';
import { signInSchema } from '@/ui/components/SignInBottomSheet/schema';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IUseSignInBottomSheet {
  ref: React.Ref<ISignInBottomSheet>;
}

export function useSignInBottomSheet({ ref }: IUseSignInBottomSheet) {
  const { bottom } = useSafeAreaInsets();

  const { signIn } = useAuth();

  const {
    control,
    handleSubmit: RHFHandleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const passwordInputRef = useRef<TextInput>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        bottomSheetModalRef.current?.present();
      },
    };
  }, []);

  const handleSubmit = RHFHandleSubmit(async (data) => {
    try {
      await signIn(data);
    } catch (error) {
      if (isAxiosError<ApiError>(error)) {
        const code = error.response?.data.error.code;
        const message = getErrorMessage(code);
        setError('root.api', { message });
      }
    }
  });

  return {
    bottom,
    bottomSheetModalRef,
    passwordInputRef,
    handleSubmit,
    control,
    isSubmitting,
    isValid,
    clearErrors,
  };
}
