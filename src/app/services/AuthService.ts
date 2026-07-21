import { Service } from '@/app/services/Service';

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
}
namespace AuthService {

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
}
