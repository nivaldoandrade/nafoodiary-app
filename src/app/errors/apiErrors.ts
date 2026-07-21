export const ApiErrorMessages: Record<string, string> = {
  VALIDATION: 'Verifique os campos e tente novamente.',
  EMAIL_ALREADY_IN_USE: 'Este e-mail já está em uso.',
  INVALID_REFRESH_TOKEN: 'Sua sessão expirou. Faça login novamente.',
  INVALID_CREDENTIALS: 'E-mail ou senha incorretos.',
  RESOURCE_NOT_FOUND: 'Recurso não encontrado.',
  BAD_REQUEST: 'Requisição inválida.',
  INTERNAL_SERVER_ERROR: 'Erro interno. Tente novamente mais tarde.',
} as const;

export function getErrorMessage(code?: string): string {
  if (!code) {
    return 'Ocorreu um erro. Tente novamente.';
  }

  return ApiErrorMessages[code] ?? 'Ocorreu um erro. Tente novamente.';
}
