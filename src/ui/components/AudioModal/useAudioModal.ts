import { useCreateMeal } from '@/app/hooks/mutations/useCreateMeal';
import { useGetMealById } from '@/app/hooks/queries/useGetMealById';
import { AppStackNavigatorProps } from '@/app/navigation/AppStack';
import { ActionType } from '@/ui/components/AudioModal';
import { CreateMealModalAnimationType } from '@/ui/components/CreateMealModals';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { AudioModule, RecordingPresets, setAudioModeAsync, useAudioRecorder } from 'expo-audio';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

interface IUseAudioModalParams {
  visible: boolean;
  onRequestClose: (animationType?: CreateMealModalAnimationType) => void;
}

export function useAudioModal({ visible, onRequestClose }: IUseAudioModalParams) {
  const [recordingStatus, setRecordingStatus] = useState<ActionType>('startRecord');
  const [recordedUri, setRecordedUri] = useState<string | null>(null);

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const queryClient = useQueryClient();
  const { navigate, addListener } = useNavigation<AppStackNavigatorProps>();

  const { createMeal, mealId, isPending } = useCreateMeal();
  const { meal, isLoading, isProcessing } = useGetMealById(mealId);

  useEffect(() => {
    if (!visible) {
      return;
    }

    (async () => {

      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        alert('Permission to access microphone was denied');
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, [visible]);

  useEffect(() => {
    if (!meal) {
      return;
    }

    if (meal.status === 'FAILED') {
      alert('Ocorreu um erro ao tenta processar sua refeição.+1 Tente novamente!');
    }

    if (meal.status === 'SUCCESS') {
      const isoDate = meal.createdAt.toISOString().split('T')[0];

      const unsubscribe = addListener('transitionEnd', ({ data }) => {
        unsubscribe();
        onRequestClose('fade');
      });

      navigate('MealDetails', { mealId: meal.id });
      if (Platform.OS === 'web') {
        unsubscribe();
        onRequestClose('fade');
      }

      queryClient.invalidateQueries({ queryKey: ['meals', isoDate] });
    }

  }, [addListener, meal, navigate, onRequestClose, queryClient]);

  const handleChangeRecordingStatus = useCallback(
    async (actionType: ActionType) => {
      if (actionType === 'recording') {
        try {
          await audioRecorder.prepareToRecordAsync();
          audioRecorder.record();
        } catch {
          alert('Permission to access microphone was denied');
          return;
        }
      }

      if (actionType === 'reviewing') {
        await audioRecorder.stop();
        setRecordedUri(audioRecorder.uri);
      }

      setRecordingStatus(actionType);
    }, [audioRecorder]);

  function handleTryAgain() {
    setRecordingStatus('startRecord');
  }

  async function handleSend() {
    if (!recordedUri) {
      return;
    }

    try {
      await createMeal(recordedUri);
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao criar a sua refeição. Tente novamente!');
    }
  }

  const isRecording = recordingStatus === 'recording';

  const isCreateMealLoaderVisible =
    isPending ||
    isLoading ||
    isProcessing ||
    meal?.status === 'SUCCESS';

  return {
    isCreateMealLoaderVisible,
    isRecording,
    recordingStatus,
    handleTryAgain,
    handleSend,
    handleChangeRecordingStatus,
    recordedUri,
    audioRecorder,
  };
}
