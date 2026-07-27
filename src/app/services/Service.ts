import { env } from '@/app/config/env';
import { create, isAxiosError } from 'axios';

export abstract class Service {
  private static interceptorId: number | undefined;

  protected static client = create({
    baseURL: env.EXPO_PUBLIC_API_URL,
  });

  static setAuthorizationToken(token: string) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  static removeAuthorizationToken() {
    this.client.defaults.headers.common['Authorization'] = undefined;
  }

  static removeInterceptorId() {
    if (this.interceptorId === undefined) {
      return;
    }

    this.client.interceptors.response.eject(this.interceptorId);
    this.interceptorId = undefined;
  }

  static setupRefreshInterceptor(onRefresh: () => Promise<string | undefined>) {
    this.removeInterceptorId();

    this.interceptorId = this.client.interceptors.response.use(
      response => response,
      async (error) => {
        if (!isAxiosError(error)) {
          return Promise.reject(error);
        }

        const originalRequest = error.config;
        const is401 = error.response?.status === 401;
        const isRefreshTokenEndpoint = originalRequest?.url?.includes('auth/refresh-token');

        if (!is401 || isRefreshTokenEndpoint || !originalRequest) {
          return Promise.reject(error);
        }
        await onRefresh();

        return this.client(originalRequest);
      },
    );
  }
}

