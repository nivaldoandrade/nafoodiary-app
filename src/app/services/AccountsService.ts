import { Service } from '@/app/services/Service';

export class AccountsService extends Service {

  static async me(): Promise<AccountsService.Me> {
    const { data } = await this.client.get<AccountsService.MeResponse>('me');

    return {
      ...data,
      profile: {
        ...data.profile,
        birthDate: new Date(data.profile.birthDate),
      },
    };
  }
}

namespace AccountsService {

  export type MeResponse = {
    profile: {
      name: string;
      birthDate: string;
      gender: string;
      height: number;
      weight: number;
    };
    goal: {
      calories: number;
      proteins: number;
      carbohydrates: number;
      fats: number;
    };
  };

  export type Me = Omit<MeResponse, 'profile'> & {
    profile: Omit<MeResponse['profile'], 'birthDate'> & {
      birthDate: Date;
    };
  };
}
