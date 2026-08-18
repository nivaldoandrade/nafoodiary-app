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

    const { data } = await this.client.post<MealsService.Create['rawResponse']>(
      'create-meal',
      {
        contentType: params.contentType,
        fileSize: params.fileSize,
      },
    );

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
      contentType: string;
      fileSize: number;
      file: File | undefined
    },

    rawResponse: {
      mealId: string;
      uploadSignature: string;
    }

    response: Omit<MealsService.Create['rawResponse'], 'uploadSignature'>;
  }
}
