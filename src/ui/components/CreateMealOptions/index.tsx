import { AppText } from '@/ui/components/AppText';
import { styles } from '@/ui/components/CreateMealOptions/styles';
import { CameraIcon, LucideIcon, MicIcon } from 'lucide-react-native';
import { Platform, Pressable, View } from 'react-native';

export function CreateMealOptions() {

  return (
    <View style={styles.container}>
      <OptionButton icon={MicIcon} label='Áudio' />
      <OptionButton icon={CameraIcon} label='Foto' />
    </View>
  );
}

interface IOptionButtonProps {
  icon: LucideIcon;
  label: string;
}

function OptionButton({ icon: Icon, label }: IOptionButtonProps) {
  return (
    <Pressable
      android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}
      style={({ pressed }) => [
        styles.buttonContainer,
        pressed && Platform.OS === 'ios' && { opacity: 0.7 },
      ]}
    >
      <View style={styles.icon}>
        <Icon size={24} />
      </View>
      <AppText weight='semiBold' style={{ letterSpacing: -0.16 }}>
        {label}
      </AppText>
    </Pressable>
  );
}
