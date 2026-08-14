import { AppText } from '@/ui/components/AppText';
import { styles } from '@/ui/components/AudioModal/Player/styles';
import { ButtonApp } from '@/ui/components/Button';
import { theme } from '@/ui/styles/theme';
import { formatSecondsToMMSS } from '@/ui/utils/formatSecondsToMM:SS';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { CheckIcon, PauseIcon, PlayIcon, Trash2Icon } from 'lucide-react-native';
import { useEffect } from 'react';
import { View } from 'react-native';

interface IPlayerProps {
  recordedUri: string | null;
  onTryAgain: () => void;
  onSend: () => void;
}

export function Player({ recordedUri, onTryAgain, onSend }: IPlayerProps) {

  const player = useAudioPlayer(recordedUri);
  const { playing, currentTime, duration } = useAudioPlayerStatus(player);

  useEffect(() => {
    if (currentTime >= duration) {
      player.seekTo(0);
    }
  }, [currentTime, duration, player]);

  function handleRemoveAudio() {
    player.remove();
    onTryAgain();
  }

  function handlePlayOrStop() {

    if (playing) {
      player.pause();
      return;
    }

    player.play();
  }

  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        <ButtonApp intent='neutral' size='icon'>
          <Trash2Icon
            size={20}
            color={theme.colors.gray[500]}
            onPress={handleRemoveAudio}
          />
        </ButtonApp>
        <ButtonApp intent='neutral' size='icon'>
          {!playing && (
            <PlayIcon
              size={20}
              color={theme.colors.lime[400]}
              fill={theme.colors.lime[400]}
              onPress={handlePlayOrStop}
            />
          )}
          {playing && (
            <PauseIcon
              size={20}
              color={theme.colors.lime[400]}
              fill={theme.colors.lime[400]}
              onPress={handlePlayOrStop}
            />
          )}
        </ButtonApp>
        <ButtonApp size='icon' onPress={onSend}>
          <CheckIcon
            size={20}
            color={theme.colors.black[700]}
          />
        </ButtonApp>
      </View>
      <AppText color={theme.colors.gray[500]}>
        {formatSecondsToMMSS(currentTime)} - {formatSecondsToMMSS(duration)}
      </AppText>
    </View>
  );
}
