import { File } from 'expo-file-system';

export async function getFileInfo(fileUri: string) {

  try {
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
