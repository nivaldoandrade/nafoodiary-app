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
  visible,
  animationType,
  onRequestClose,
  onDismiss,
}: ICreateMealModalsProps) {

  return (
    <>
      <AudioModal
        visible={visible && activeCreateMealModal === 'audio'}
        animationType={animationType}
        onRequestClose={onRequestClose}
        onDismiss={onDismiss}
      />

      <PhotoModal
        visible={visible && activeCreateMealModal === 'photo'}
        animationType={animationType}
        onRequestClose={onRequestClose}
        onDismiss={onDismiss}
      />
    </>
  );
}
