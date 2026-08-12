import { AppText } from '@/ui/components/AppText';
import { styles } from '@/ui/components/AudioModal/styles';
import { ButtonApp } from '@/ui/components/Button';
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalWrapper,
} from '@/ui/components/ModalWrapper';
import { theme } from '@/ui/styles/theme';
import { MicIcon } from 'lucide-react-native';
import { View } from 'react-native';

interface IAudioModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AudioModal({ visible, onClose }: IAudioModalProps) {
  const isRecording = false;

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
        <ButtonApp intent='neutral' size='icon'>
          <MicIcon size={20} color={theme.colors.lime[600]} />
        </ButtonApp>
        <AppText color={theme.colors.gray[500]} style={{ textAlign: 'center' }}>
          Toque no microfone{'\n'}para começar a gravar
        </AppText>
      </ModalFooter>
    </ModalWrapper>
  );
}
