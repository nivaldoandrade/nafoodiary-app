import { useCreateMeal } from '@/app/hooks/mutations/useCreateMeal';
import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { ModalContent, ModalFooter, ModalHeader, ModalWrapper } from '@/ui/components/ModalWrapper';
import { PhotoActions } from '@/ui/components/PhotoModal/PhotoActions';
import { styles } from '@/ui/components/PhotoModal/styles';
import { theme } from '@/ui/styles/theme';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { CameraIcon, LockIcon } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Image, View } from 'react-native';

export type PhotoActionType = 'takePhoto' | 'reviewing';

interface IPhotoModalProps {
  visible: boolean;
  onClose: () => void;
}

export function PhotoModal({ visible, onClose }: IPhotoModalProps) {
  const [photoActionType, setPhotoActionType] = useState<PhotoActionType>('takePhoto');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const { createMeal } = useCreateMeal();

  async function handleSend() {
    if (!photoUri) {
      return;
    }

    try {
      await createMeal(photoUri);
    } catch (error) {
      console.error(error);
    }
  }
  function handleTryAgain() {
    setPhotoActionType('takePhoto');
    setPhotoUri(null);
  }

  async function handleTakePicture() {
    if (!cameraRef.current) {
      return;
    }

    const photo = await cameraRef.current.takePictureAsync();
    setPhotoUri(photo.uri);
    setPhotoActionType('reviewing');
  }

  if (!permission) {
    return;
  }

  return (
    <ModalWrapper
      visible={visible}
      onCloseModal={onClose}
    >
      <ModalHeader style={styles.header} onPress={onClose} />
      <ModalContent style={styles.content}>
        {!permission.granted &&
          <View style={styles.permissionContainer}>
            <View style={styles.iconCircle}>
              <CameraIcon
                size={32}
                color={theme.colors.lime[400]}
                strokeWidth={1.5}
              />
            </View>

            <AppText size='lg' color={theme.colors.gray[100]}>
              Ativar câmera
            </AppText>

            <AppText size='sm' color={theme.colors.gray[200]} style={{ textAlign: 'center' }}>
              Para registrar suas refeições, precisamos de acesso à câmera do
              seu dispositivo.
            </AppText>

            <View style={styles.privacyBadge}>
              <LockIcon
                size={11}
                color={theme.colors.lime[700]}
                strokeWidth={2}
              />
              <AppText size='xs' color={theme.colors.lime[700]}>
                Só usada no momento da foto
              </AppText>
            </View>
          </View>
        }
        {permission.granted && (
          <>
            {!photoUri ? (
              <CameraView
                ref={cameraRef}
                facing='back'
                style={styles.cameraAndPhotoContainer}
              />
            ) : (
              <Image
                source={{ uri: photoUri }}
                style={styles.cameraAndPhotoContainer}
              />
            )}
          </>
        )}
      </ModalContent>
      <ModalFooter style={styles.footer}>
        {!permission.granted && (
          <ButtonApp
            onPress={requestPermission}
            leftIcon={<LockIcon size={16}
            />}>
            Conceder permissão
          </ButtonApp>
        )}
        {permission.granted && (
          <PhotoActions
            actionType={photoActionType}
            onTakePicture={handleTakePicture}
            onTryAgain={handleTryAgain}
            onSend={handleSend}
          />
        )}
      </ModalFooter>
    </ModalWrapper>
  );
}
