import { Service } from '@/app/services/Service';
import { Goal } from '@/app/types/Goal';

export class AccountsService extends Service {

  static async me(): Promise<AccountsService.Me> {
    const { data } = await this.client.get<AccountsService.MeResponse>('me');

    return {
      ...data,
      profile: {
        ...data.profile,
        birthDate: this.parseDateFromAPI(data.profile.birthDate),
      },
    };
  }

  static async updateProfile(params: AccountsService.UpdateProfileParams): Promise<void> {
    await this.client.put('profiles', params);
  }

  private static parseDateFromAPI(dateString: string): Date {
    const date = new Date(dateString);

    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
    );
  };
}

export namespace AccountsService {

  export type MeResponse = {
    profile: {
      name: string;
      birthDate: string;
      gender: string;
      height: number;
      weight: number;
      goal: Goal;
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

  export type UpdateProfileParams = {
    name: string;
    height: number;
    weight: number;
    gender: string;
    birthDate: string;
  };
}
