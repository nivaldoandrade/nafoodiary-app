import { ButtonApp } from '@/ui/components/Button';
import { styles } from '@/ui/components/ModalWrapper/styles';
import { theme } from '@/ui/styles/theme';
import { XIcon } from 'lucide-react-native';
import { Modal, StyleProp, View, ViewStyle } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface IModalWrapperProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>;
  visible?: boolean;
  onCloseModal: () => void;
}

export function ModalWrapper({
  children,
  style,
  visible,
  onCloseModal,
}: IModalWrapperProps) {

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="slide"
      onRequestClose={onCloseModal}
    >
      <View style={styles.container}>
        <SafeAreaProvider>
          <SafeAreaView style={[styles.wrapper, style]}>
            {children}
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
    </Modal>
  );
}

interface IModalHeaderProps {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export function ModalHeader({ style, onPress }: IModalHeaderProps) {

  return (
    <View style={[styles.header, style]}>
      <ButtonApp intent='neutral' size='icon' onPress={onPress}>
        <XIcon size={20} color={theme.colors.gray[500]} />
      </ButtonApp>
    </View>
  );
}

interface IModalContentProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>;
}

export function ModalContent({ children, style }: IModalContentProps) {
  return (
    <View style={style}>
      {children}
    </View>
  );
}

interface IModalFooterProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>;
}

export function ModalFooter({ children, style }: IModalFooterProps) {
  return (
    <View style={style}>
      {children}
    </View>
  );
}
