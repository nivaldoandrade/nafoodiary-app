import { env } from '@/app/config/env';
import { create } from 'axios';

export abstract class Service {

  protected static client = create({
    baseURL: env.EXPO_PUBLIC_API_URL,
  });

  static setAuthorizationToken(token: string) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}
