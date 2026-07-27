import { Service } from '@/app/services/Service';
import { OnboardingSchemaOutput } from '@/ui/screens/onboarding/schema';

export class AuthService extends Service {

  static async signIn(
    params: AuthService.SignIn['params'],
  ): Promise<AuthService.SignIn['response']> {

    const { data } = await this.client.post<AuthService.SignIn['response']>(
      'auth/sign-in',
      params,
    );
    return data;
  }

  static async signUp(
    params: AuthService.SignUp['params'],
  ): Promise<AuthService.SignUp['response']> {
    const { data } = await this.client.post<AuthService.SignUp['response']>(
      'auth/sign-up',
      params,
    );

    return data;
  }

  static async refreshToken(
    params: AuthService.RefreshToken['params'],
  ): Promise<AuthService.RefreshToken['response']> {
    const { data } = await this.client.post<AuthService.RefreshToken['response']>(
      'auth/refresh-token',
      params,
    );

    return data;
  }
}

export namespace AuthService {

  export type SignIn = {
    params: {
      email: string;
      password: string;
    },
    response: {
      accessToken: string;
      refreshToken: string;
    }
  }

  export type SignUp = {
    params: OnboardingSchemaOutput,
    response: {
      accessToken: string;
      refreshToken: string;
    }
  }

  export type RefreshToken = {
    params: {
      refreshToken: string;
    },
    response: {
      accessToken: string;
      refreshToken: string;
    }
  }
}
