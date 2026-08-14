import { AppText } from '@/ui/components/AppText';
import { ActionType } from '@/ui/components/AudioModal';
import { Player } from '@/ui/components/AudioModal/Player';
import { ButtonApp } from '@/ui/components/Button';
import { theme } from '@/ui/styles/theme';
import { AudioRecorder, useAudioRecorderState } from 'expo-audio';
import { MicIcon, SquareIcon } from 'lucide-react-native';
import { useEffect } from 'react';

const MAX_DURATION_IN_MILLIS = 30000; //30 seconds

interface IActionsProps {
  actionType?: ActionType
  onChangeRecordingStatus: (status: ActionType) => Promise<void>;
  onTryAgain: () => void;
  onSend: () => void;
  recordedUri: string | null;
  audioRecorder: AudioRecorder;
}

export function Actions({
  actionType,
  onChangeRecordingStatus,
  onTryAgain,
  onSend,
  recordedUri,
  audioRecorder,
}: IActionsProps) {
  const { durationMillis } = useAudioRecorderState(audioRecorder, 100);

  useEffect(() => {
    if (durationMillis >= MAX_DURATION_IN_MILLIS) {
      onChangeRecordingStatus('reviewing');
    }
  }, [durationMillis, onChangeRecordingStatus]);

  if (actionType === 'startRecord') {
    return (
      <>
        <ButtonApp
          intent='neutral'
          size='icon'
          onPress={() => onChangeRecordingStatus('recording')}
        >
          <MicIcon size={20} color={theme.colors.lime[600]} />
        </ButtonApp>
        <AppText color={theme.colors.gray[500]} style={{ textAlign: 'center' }}>
          Toque no microfone{'\n'}para começar a gravar
        </AppText>
      </>
    );
  }

  if (actionType === 'recording') {
    return (
      <>
        <ButtonApp
          intent='neutral'
          size='icon'
          onPress={() => onChangeRecordingStatus('reviewing')}
        >
          <SquareIcon
            size={20}
            color={theme.colors.lime[400]}
            fill={theme.colors.lime[400]}
          />
        </ButtonApp>
        <AppText color={theme.colors.gray[500]}>
          {formatMsToMMSS(durationMillis)}
        </AppText>
      </>
    );
  }

  if (actionType === 'reviewing') {
    return (
      <Player
        recordedUri={recordedUri}
        onTryAgain={onTryAgain}
        onSend={onSend}
      />
    );
  }

}

function formatMsToMMSS(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
}

