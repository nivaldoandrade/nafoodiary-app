import { ValueOf } from '@/app/utils/ValueOf';

export const ErrorCode = {
  VALIDATION: 'VALIDATION',
  EMAIL_ALREADY_IN_USE: 'EMAIL_ALREADY_IN_USE',
  INVALID_REFRESH_TOKEN: 'INVALID_REFRESH_TOKEN',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',

  // HTTP
  BAD_REQUEST: 'BAD_REQUEST',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

export type ErrorCode = ValueOf<typeof ErrorCode>;

export type ApiError = {
  error: {
    code: ErrorCode
    message: string;
  };
};

export const ApiErrorMessages: Record<ErrorCode, string> = {
  VALIDATION: 'Verifique os campos e tente novamente.',
  EMAIL_ALREADY_IN_USE: 'Este e-mail já está em uso.',
  INVALID_REFRESH_TOKEN: 'Sua sessão expirou. Faça login novamente.',
  INVALID_CREDENTIALS: 'E-mail ou senha incorretos.',
  RESOURCE_NOT_FOUND: 'Recurso não encontrado.',
  BAD_REQUEST: 'Requisição inválida.',
  INTERNAL_SERVER_ERROR: 'Erro interno. Tente novamente mais tarde.',
} as const;

export function getErrorMessage(code?: ErrorCode): string {
  return code ? ApiErrorMessages[code] : 'Ocorreu um erro. Tente novamente.';
}
