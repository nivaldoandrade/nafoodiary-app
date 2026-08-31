import * as z from 'zod';

const requiredNumber = (msg: string) => (
  z.number(msg).min(1, msg)

);

export const editGoalsSchema = z.object({
  calories: requiredNumber('Informe as calorias'),
  proteins: requiredNumber('Informe as proteínas'),
  carbohydrates: requiredNumber('Informe as carboidratos'),
  fats: requiredNumber('Informe as gorduras'),
});

export type EditGoalSchema = z.infer<typeof editGoalsSchema>;
