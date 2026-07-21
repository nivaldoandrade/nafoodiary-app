import { ApiErrorMessages } from '@/app/errors/apiErrors';

export type ApiError = {
  error: {
    code: keyof typeof ApiErrorMessages;
    message: string;
  };
};
