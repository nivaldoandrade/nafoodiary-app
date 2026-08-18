import { env } from '@/app/config/env';
import axios, { create, isAxiosError } from 'axios';
import base64 from 'react-native-base64';

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

  static async uploadPresignedPOST({
    uploadSignature,
    file,
  }: Service.UploadPresignedPOSTParams) {
    const decodedSignature = base64.decode(uploadSignature);

    const { url, fields } = JSON.parse(decodedSignature) as Service.DecodedSignature;

    const formData = new FormData();

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('file', file as File);

    await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

namespace Service {

  export type UploadPresignedPOSTParams = {
    uploadSignature: string;
    file: {
      name: string;
      uri: string;
      type: string;
    } | File;
  }

  export type DecodedSignature = {
    url: string;
    fields: Record<string, string>;
  }
}

