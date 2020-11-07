import { getRepository } from 'typeorm';
import Residence from '../models/Residence';

import AppError from '../errors/AppError';

interface Request {
  images: Array<string>;
  residence_id: string;
}
class UpdateResidenceImages {
  public async execute({ images, residence_id }: Request): Promise<Residence> {
    const residenceRepository = getRepository(Residence);
    const residence = await residenceRepository.findOne({
      where: { id: residence_id },
    });

    if (!residence) {
      throw new AppError("Residence doesn't exist", 404);
    }

    residence.images.push(...images);
    const updatedResidence = await residenceRepository.save(residence);
    return updatedResidence;
  }
}
export default UpdateResidenceImages;
