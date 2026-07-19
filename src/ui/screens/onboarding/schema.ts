import { ActivityLevel } from '@/app/types/ActivityLevel';
import { Gender } from '@/app/types/Gender';
import { Goal } from '@/app/types/Goal';
import * as z from 'zod';

export const onboardingSchema = z.object({
  profile: z.object({
    name: z.string(),
    goal: z.enum(Goal, { error: 'Selecione pelo menos 1 opção' }),
    gender: z.enum(Gender),
    height: z.string().min(1),
    weight: z.string().min(1),
    activityLevel: z.enum(ActivityLevel),
    birthDate: z.date(),
  }),
  account: z.object({
    email: z.email(),
    password: z.string().min(1),
    confirmPassword: z.string(),
  }),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
