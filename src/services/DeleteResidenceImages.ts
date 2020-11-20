import { Storage } from '@google-cloud/storage';
import { getRepository } from 'typeorm';
import Residence from '../models/Residence';
import AppError from '../errors/AppError';

interface Request {
  residence_id: string;
  imagesToDelete: Array<string>;
}

class DeleteResidenceImages {
  public async execute({
    residence_id,
    imagesToDelete,
  }: Request): Promise<void> {
    const residenceRepository = getRepository(Residence);

    const residence = await residenceRepository.findOne({
      where: { id: residence_id },
    });
    if (!residence) {
      throw new AppError("The residence doesn't exist", 404);
    }
    residence.images = residence.images.filter((image: string) => {
      return !imagesToDelete.includes(image);
    });

    const storage = new Storage({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });
    const bucketName = 'imora_residence_pictures';

    imagesToDelete.map(async (image: string) => {
      await storage
        .bucket(bucketName)
        .file(image.substr(8).split('/')[2])
        .delete();
    });

    await residenceRepository.save(residence);
  }
}
export default DeleteResidenceImages;
