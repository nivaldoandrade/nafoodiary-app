import { getFileInfo } from '@/app/libs/getFileInfo';
import { MealsService } from '@/app/services/MealsService';
import { useMutation } from '@tanstack/react-query';

export function useCreateMeal() {

  const { mutateAsync } = useMutation({
    mutationFn: async (fileOrUri: string | File) => {
      const { mimeType, size, file } = await getFileInfo(fileOrUri);

      await MealsService.create({
        contentType: mimeType,
        fileSize: size,
        file,
      });
    },
  });

  return {
    createMeal: mutateAsync,
  };
}
