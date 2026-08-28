import * as z from 'zod';

export const editGoalsSchema = z.object({
  calories: z.number().min(1, 'Informe as calorias'),
  proteins: z.number().min(1, 'Informe as proteínas'),
  carbohydrates: z.number().min(1, 'Informe as carboidratos'),
  fats: z.number().min(1, 'Informe as gorduras'),
});

export type EditGoalSchema = z.infer<typeof editGoalsSchema>;
