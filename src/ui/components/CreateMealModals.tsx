import { AudioModal } from '@/ui/components/AudioModal';
import { PhotoModal } from '@/ui/components/PhotoModal';

export type CreateMealModalType = 'audio' | 'photo' | null;
export type CreateMealModalAnimationType = 'slide' | 'fade';

interface ICreateMealModalsProps {
  activeCreateMealModal: CreateMealModalType;
  visible: boolean;
  animationType: CreateMealModalAnimationType;
  onRequestClose: (animationType?: CreateMealModalAnimationType) => void;
  onDismiss: () => void;
}

export function CreateMealModals({
  activeCreateMealModal,
  ...props
}: ICreateMealModalsProps) {

  if (activeCreateMealModal === 'audio') {
    return <AudioModal {...props} />;
  }

  if (activeCreateMealModal === 'photo') {
    return <PhotoModal {...props} />;
  }

  return null;
}
