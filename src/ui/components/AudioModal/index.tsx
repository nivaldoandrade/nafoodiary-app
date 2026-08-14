import { AppText } from '@/ui/components/AppText';
import { Actions } from '@/ui/components/AudioModal/Actions';
import { styles } from '@/ui/components/AudioModal/styles';
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
} from '@/ui/components/ModalWrapper';
import { theme } from '@/ui/styles/theme';
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
} from 'expo-audio';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

export type ActionType = 'startRecord' | 'recording' | 'reviewing';

interface IAudioModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AudioModal({ visible, onClose }: IAudioModalProps) {
  const [recordingStatus, setRecordingStatus] = useState<ActionType>('startRecord');
  const [recordedUri, setRecordedUri] = useState<string | null>(null);

  const audioRecorder = useAudioRecorder(RecordingPresets.LOW_QUALITY);

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

  function handleSend() {
    alert('Enviando o arquivo do audio');
  }

  const isRecording = recordingStatus === 'recording';

  return (
    <ModalWrapper
      style={styles.wrapper}
      visible={visible}
      onCloseModal={onClose}
    >
      <ModalHeader style={styles.header} onPress={onClose} />
      <ModalContent style={styles.content}>
        <View style={[styles.circle1, isRecording && styles.circle1Recording]}>
          <View style={[styles.circle2, isRecording && styles.circle2Recording]}>
            <View style={[styles.circle3, isRecording && styles.circle3Recording]} />
          </View>
        </View>

        <View style={styles.exampleContent}>
          <AppText color={theme.colors.gray[500]} style={{ textAlign: 'center' }}>
            Tente dizer algo como: 100g de Arroz, 2 Ovos e 100g de Salada
          </AppText>
        </View>
      </ModalContent>
      <ModalFooter style={styles.footer}>
        <Actions
          actionType={recordingStatus}
          onTryAgain={handleTryAgain}
          onSend={handleSend}
          onChangeRecordingStatus={handleChangeRecordingStatus}
          recordedUri={recordedUri}
          audioRecorder={audioRecorder}
        />
      </ModalFooter>
    </ModalWrapper>
  );
}

