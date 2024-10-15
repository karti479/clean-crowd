import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

// Set up Google Cloud Storage client
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID!,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL!,
    private_key: process.env.GCP_PRIVATE_KEY!.replace(/\\n/g, '\n') // Ensure proper formatting for the private key
  }
});

export async function uploadImage(file: File): Promise<string> {
  const fileExtension = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  const bucketName = process.env.GCP_STORAGE_BUCKET_NAME!;
  
  const bucket = storage.bucket(bucketName);
  const blob = bucket.file(fileName);

  try {
    const buffer = Buffer.from(await file.arrayBuffer()); // Convert File to Buffer
    await blob.save(buffer, { // Use the buffer instead of the file
      contentType: file.type
    });
    
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}
