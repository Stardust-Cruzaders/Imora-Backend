import { Storage } from '@google-cloud/storage';
import { Request, Response, NextFunction } from 'express';

interface MulterRequest extends Request {
  file: any;
}

const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const bucketName = 'imora_user_pictures';

const bucket = storage.bucket(bucketName);

function getPublicUrl(filename: string): string {
  return `https://storage.googleapis.com/${bucketName}/${filename}`;
}

const uploadToGcs = (
  request: MulterRequest,
  response: Response,
  next: NextFunction,
) => {
  if (!request.file) {
    return next();
  }

  const gcsname = `${request.file.originalname}${Date.now()}`;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: request.file.mimetype,
    },
  });

  stream.on('error', err => {
    request.file.cloudStorageError = err;
    next(err);
  });
  stream.on('finish', () => {
    request.file.cloudStorageObject = gcsname;
    request.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });
  stream.end(request.file.buffer);
};

export default uploadToGcs;
