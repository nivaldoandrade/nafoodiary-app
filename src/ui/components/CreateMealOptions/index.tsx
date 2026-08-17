import { AppText } from '@/ui/components/AppText';
import { AudioModal } from '@/ui/components/AudioModal';
import { styles } from '@/ui/components/CreateMealOptions/styles';
import { PhotoModal } from '@/ui/components/PhotoModal';
import { CameraIcon, LucideIcon, MicIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Platform, Pressable, PressableProps, View } from 'react-native';

interface ICreateMealOptionsProps {
  disabled?: boolean;
}

type ModalTypeOption = 'audio' | 'photo' | null

export function CreateMealOptions({
  disabled,
}: ICreateMealOptionsProps,
) {
  const [modalTypeOption, setModalTypeOption] = useState<ModalTypeOption>(null);

  function handleOpenModal(type: ModalTypeOption) {
    setModalTypeOption(type);
  }

  function handleCloseModal() {
    setModalTypeOption(null);
  }

  return (
    <View style={styles.container}>
      <AudioModal
        visible={modalTypeOption === 'audio'}
        onClose={handleCloseModal}
      />

      <PhotoModal
        visible={modalTypeOption === 'photo'}
        onClose={handleCloseModal}
      />

      <OptionButton
        icon={MicIcon}
        label='Áudio'
        disabled={disabled}
        onPress={() => handleOpenModal('audio')}
      />
      <OptionButton
        icon={CameraIcon}
        label='Foto'
        disabled={disabled}
        onPress={() => handleOpenModal('photo')}
      />
    </View>
  );
}

interface IOptionButtonProps extends PressableProps {
  icon: LucideIcon;
  label: string;
}

function OptionButton({ icon: Icon, label, disabled = false, ...props }: IOptionButtonProps) {
  return (
    <View style={styles.buttonWrapper}>
      <Pressable
        android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}
        disabled={disabled}
        style={({ pressed }) => [
          styles.buttonContainer,
          (pressed || disabled) && {
            ...Platform.select({
              ios: { opacity: 0.7 },
              web: { opacity: 0.4 },
              default: null,
            }),
          },
        ]}
        {...props}
      >
        <View style={styles.icon}>
          <Icon size={24} />
        </View>
        <AppText weight='semiBold' style={{ letterSpacing: -0.16 }}>
          {label}
        </AppText>
      </Pressable>
    </View>
  );
}
