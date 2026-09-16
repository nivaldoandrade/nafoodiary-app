import { Service } from '@/app/services/Service';
import { ActivityLevel } from '@/app/types/ActivityLevel';
import { Gender } from '@/app/types/Gender';
import { Goal } from '@/app/types/Goal';

export class AccountsService extends Service {

  static async me(): Promise<AccountsService.Me> {
    const { data } = await this.client.get<AccountsService.MeResponse>('me');

    if (!data.isOnboarded || !data.profile || !data.goal) {
      return {
        isOnboarded: false,
        profile: null,
        goal: null,
      };
    }

    return {
      isOnboarded: true,
      profile: {
        ...data.profile,
        birthDate: this.parseDateFromAPI(data.profile.birthDate),
      },
      goal: data.goal,
    };
  }

  static async updateProfile(params: AccountsService.UpdateProfileParams): Promise<void> {
    await this.client.put('profiles', params);
  }

  static async completeOnboarding(params: AccountsService.CompleteOnboardingParams): Promise<void> {
    await this.client.post('auth/complete-onboarding', params);

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
    isOnboarded: boolean;
    profile: {
      name: string;
      birthDate: string;
      gender: string;
      height: number;
      weight: number;
      goal: Goal;
    } | null;
    goal: {
      calories: number;
      proteins: number;
      carbohydrates: number;
      fats: number;
    } | null;
  };

  export type Me =
    | {
        isOnboarded: false;
        profile: null;
        goal: null;
      }
    | {
        isOnboarded: true;
        profile: Omit<NonNullable<MeResponse['profile']>, 'birthDate'> & {
          birthDate: Date;
        };
        goal: NonNullable<MeResponse['goal']>;
      };

  export type UpdateProfileParams = {
    name: string;
    height: number;
    weight: number;
    gender: string;
    birthDate: string;
  };

  export type CompleteOnboardingParams = {
    accessToken: string;
    birthDate: string;
    height: number;
    weight: number;
    gender: Gender;
    goal: Goal;
    activityLevel: ActivityLevel;
  };
}
