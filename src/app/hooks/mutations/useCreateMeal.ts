import { getFileInfo } from '@/app/libs/getFileInfo';
import { MealsService } from '@/app/services/MealsService';
import { useMutation } from '@tanstack/react-query';

export function useCreateMeal() {

  const { mutateAsync } = useMutation({
    mutationFn: async (fileOrUri: string) => {
      const { filename, mimeType, size, file } = await getFileInfo(fileOrUri);

      await MealsService.create({
        uri: fileOrUri,
        contentType: mimeType,
        fileSize: size,
        filename,
        file,
      });
    },
  });

  return {
    createMeal: mutateAsync,
  };
}
