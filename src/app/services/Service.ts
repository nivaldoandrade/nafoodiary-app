import { env } from '@/app/config/env';
import { create } from 'axios';

export abstract class Service {

  protected static client = create({
    baseURL: env.EXPO_PUBLIC_API_URL,
  });
}
