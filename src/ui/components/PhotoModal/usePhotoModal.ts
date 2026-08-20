import { useCreateMeal } from '@/app/hooks/mutations/useCreateMeal';
import { useGetMealById } from '@/app/hooks/queries/useGetMealById';
import { AppStackNavigatorProps } from '@/app/navigation/AppStack';
import { PhotoActionType } from '@/ui/components/PhotoModal';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';

interface IUsePhotoModalParams {
  onClose: () => void;
}

export function usePhotoModal({ onClose }: IUsePhotoModalParams) {
  const [photoActionType, setPhotoActionType] = useState<PhotoActionType>('takePhoto');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const { dismiss } = useBottomSheetModal();
  const { navigate } = useNavigation<AppStackNavigatorProps>();

  const { createMeal, mealId, isPending } = useCreateMeal();
  const { meal, isLoading, isProcessing } = useGetMealById(mealId);

  useEffect(() => {
    if (!meal) {
      return;
    }

    if (meal.status === 'FAILED') {
      alert('Ocorreu um erro ao tenta processar sua refeição. Tente novamente!');
    }

    if (meal.status === 'SUCCESS') {

      navigate('MealDetails', { mealId: meal.id });
      onClose();
      dismiss();

    }
  }, [meal, navigate, onClose, dismiss]);

  async function handleSend() {
    if (!photoUri) {
      return;
    }

    try {
      await createMeal(photoUri);
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao criar a sua refeição. Tente novamente!');
    }
  }

  function handleTryAgain() {
    setPhotoActionType('takePhoto');
    setPhotoUri(null);
  }

  async function handleTakePicture() {
    if (!cameraRef.current) {
      return;
    }

    const photo = await cameraRef.current.takePictureAsync();
    setPhotoUri(photo.uri);
    setPhotoActionType('reviewing');
  }

  return {
    photoActionType,
    loading: isLoading || isPending || isProcessing,
    permission,
    photoUri,
    cameraRef,
    requestPermission,
    handleTakePicture,
    handleTryAgain,
    handleSend,
  };
}
