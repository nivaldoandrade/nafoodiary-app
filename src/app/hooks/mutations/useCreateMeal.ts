import { getFileInfo } from '@/app/libs/getFileInfo';
import { MealsService } from '@/app/services/MealsService';
import { useMutation } from '@tanstack/react-query';

export function useCreateMeal() {

  const { mutateAsync } = useMutation({
    mutationFn: async (fileUri: string) => {
      const { mimeType, size } = await getFileInfo(fileUri);

      await MealsService.create({
        contentType: mimeType,
        fileSize: size,
      });
    },
  });

  return {
    createMeal: mutateAsync,
  };
}
