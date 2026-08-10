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

}

namespace MealsService {

  export type ListByDayResponse = {
    meals: {
      id: string;
      name: string;
      icon: string;
      foods: Food[];
      createdAt: string;
    }[]
  };
}
