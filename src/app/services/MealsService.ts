import { Service } from '@/app/services/Service';
import { Food } from '@/app/types/Food';

export class MealsService extends Service {

  static async listByDay(date: string): Promise<MealsService.ListByDayResponse> {

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const { data } = await this.client.get<MealsService.ListByDayResponse>(
      'meals',
      {
        params: {
          date,
        },
      },
    );

    return data;
  }

  static async create(
    params: MealsService.Create['params'],
  ): Promise<MealsService.Create['response']> {

    const { data } = await this.client
      .post<MealsService.Create['rawResponse']>('create-meal', { ...params });

    return {
      mealId: data.mealId,
    };
  }

}

export namespace MealsService {

  export type ListByDayResponse = {
    meals: {
      id: string;
      name: string;
      icon: string;
      foods: Food[];
      createdAt: string;
    }[]
  };

  export type Create = {
    params: {
      contentType: 'audio/m4a' | 'image/jpeg';
      fileSize: number;
    },

    rawResponse: {
      mealId: string;
      uploadSignature: string;
    }

    response: Omit<MealsService.Create['rawResponse'], 'uploadSignature'>;
  }
}
