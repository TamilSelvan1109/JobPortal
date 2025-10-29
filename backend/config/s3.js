import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./cloudinary.js";

export const uploadToS3 = async (file, folder = "uploads") => {
  const key = `${folder}/${Date.now()}-${file.originalname}`;
  
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3Client.send(command);
  
  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};