import { getRepository } from 'typeorm';
import Residence from '../models/Residence';

import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  owner_id: string;
  images: Array<string>;
  residence_id: string;
}
class UpdateResidenceImages {
  public async execute({
    owner_id,
    images,
    residence_id,
  }: Request): Promise<Residence> {
    const residenceRepository = getRepository(Residence);
    const userRepository = getRepository(User);
    const residence = await residenceRepository.findOne({
      where: { id: residence_id },
    });
    const user = await userRepository.findOne({
      where: { id: owner_id },
    });
    if (!residence) {
      throw new AppError("Residence doesn't exist", 404);
    }
    if (!user) {
      throw new AppError("User doesn't exist", 404);
    }
    if (residence.owner_id !== user.id) {
      throw new AppError("You're not the owner of this residence", 403);
    }
    residence.images.push(...images);
    const updatedResidence = await residenceRepository.save(residence);
    return updatedResidence;
  }
}
export default UpdateResidenceImages;
