import { AppText } from '@/ui/components/AppText';
import { AudioModal } from '@/ui/components/AudioModal';
import { styles } from '@/ui/components/CreateMealOptions/styles';
import { CameraIcon, LucideIcon, MicIcon } from 'lucide-react-native';
import { Platform, Pressable, View } from 'react-native';

interface ICreateMealOptionsProps {
  disabled?: boolean;
}

export function CreateMealOptions({
  disabled,
}: ICreateMealOptionsProps,
) {

  return (
    <View style={styles.container}>
      <AudioModal />

      <OptionButton icon={MicIcon} label='Áudio' disabled={disabled} />
      <OptionButton icon={CameraIcon} label='Foto' disabled={disabled} />
    </View>
  );
}

interface IOptionButtonProps {
  icon: LucideIcon;
  label: string;
  disabled?: boolean;
}

function OptionButton({ icon: Icon, label, disabled = false }: IOptionButtonProps) {
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
