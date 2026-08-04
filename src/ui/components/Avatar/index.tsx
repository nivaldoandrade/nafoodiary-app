import { AppText } from '@/ui/components/AppText';
import { avatar, AvatarVariants } from '@/ui/components/Avatar/styles';
import { theme } from '@/ui/styles/theme';
import { View } from 'react-native';

type AvatarProps = AvatarVariants & {
  name: string;
};

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export function Avatar({ name, size }: AvatarProps) {
  const initials = getInitials(name);

  return (
    <View style={avatar({ size })}>
      <AppText
        weight='semiBold'
        size='lg'
        color={theme.colors.black[700]}
      >
        {initials}
      </AppText>
    </View>
  );
}
