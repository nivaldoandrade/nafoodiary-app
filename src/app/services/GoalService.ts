import { Service } from '@/app/services/Service';

export class GoalService extends Service {

  static async update(params: GoalService.UpdateParams): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 5000));
    await this.client.post('goals', params);
  }

}

export namespace GoalService {
  export type UpdateParams = {
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
  }
}
