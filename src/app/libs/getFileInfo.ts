
import { File } from 'expo-file-system';
import { Platform } from 'react-native';

export async function getFileInfo(fileOrUri: string | globalThis.File) {
  try {
    if (Platform.OS === 'web') {
      const file = await resolveWebFile(fileOrUri);

      if (!file || !file.size) {
        throw new Error('File does not exist.');
      }

      return {
        size: file.size,
        mimeType: file.type,
        file,
      } as const;
    }

    const fileUri = fileOrUri as string;
    const fileInfo = new File(fileUri).info();
    const filename = fileUri.split('/').at(-1);

    if (!fileInfo.exists || !fileInfo.size || !filename) {
      throw new Error('File does not exist.');
    }

    const mimeType = filename.endsWith('.jpg') ? 'image/jpeg' : 'audio/m4a';

    return {
      size: fileInfo.size,
      mimeType,
    } as const;
  } catch (error) {
    console.log('Error file info:', error);
    throw error;
  }
}

function isBase64Uri(uri: string): boolean {
  return uri.startsWith('data:');
}

function isBlobUri(uri: string): boolean {
  return uri.startsWith('blob:');
}

function convertToJpeg(dataUri: string, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) { return reject(new Error('Canvas context unavailable')); }
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = reject;
    img.src = dataUri;
  });
}

async function base64ToFile(dataUri: string): Promise<globalThis.File> {
  const jpegDataUri = await convertToJpeg(dataUri);
  const [header, data] = jpegDataUri.split(',');
  const mimeType = header.match(/:(.*?);/)?.[1] ?? 'image/jpeg';
  const byteString = atob(data);
  const byteArray = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([byteArray], { type: mimeType });

  const filename = `${crypto.randomUUID()}.jpg`;
  return new globalThis.File([blob], filename, { type: mimeType });
}

async function blobUriToFile(blobUri: string): Promise<globalThis.File> {
  const response = await fetch(blobUri);
  const blob = await response.blob();
  const mimeType = blob.type || 'audio/webm';
  const filename = `${crypto.randomUUID()}.webm`;
  return new globalThis.File([blob], filename, { type: mimeType });
}

async function resolveWebFile(fileOrUri: string | globalThis.File): Promise<globalThis.File> {
  if (typeof fileOrUri !== 'string') {
    return fileOrUri;
  }

  if (isBase64Uri(fileOrUri)) {
    return base64ToFile(fileOrUri);
  }
  if (isBlobUri(fileOrUri)) {
    return blobUriToFile(fileOrUri);
  }

  throw new Error('Unsupported URI format on web.');
}

