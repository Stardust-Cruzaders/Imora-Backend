import { getRepository } from 'typeorm';
import Residence from '../models/Residence';

import AppError from '../errors/AppError';

interface Request {
  residence_id: string;
  residence_name: string;
  description: string;
  zipcode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  numberr: string;
  complement?: string;
  residence_type: string;
  residence_place: string;
  price: number;
  allow_smokers: boolean;
  allow_pets: boolean;
  wifi: boolean;
  kitchen: boolean;
  tv: boolean;
  ac: boolean;
  notebook_work: boolean;
  grill: boolean;
  pool: boolean;
  parking: boolean;
  num_rooms: number;
  num_bathrooms: number;
  current_residents: number;
  max_residents: number;
}

class UpdateResidenceService {
  public async execute({
    residence_id,
    residence_name,
    description,
    zipcode,
    state,
    city,
    neighborhood,
    street,
    numberr,
    complement,
    residence_type,
    residence_place,
    price,
    allow_smokers,
    allow_pets,
    wifi,
    kitchen,
    tv,
    ac,
    notebook_work,
    grill,
    pool,
    parking,
    num_rooms,
    num_bathrooms,
    current_residents,
    max_residents,
  }: Request): Promise<Residence> {
    const residenceRepository = getRepository(Residence);

    const residence = await residenceRepository.findOne({
      where: { id: residence_id },
    });

    if (!residence) {
      throw new AppError("Residence doesn't exist");
    }
    residence.residence_name = residence_name;
    residence.description = description;
    residence.zipcode = zipcode;
    residence.state = state;
    residence.city = city;
    residence.neighborhood = neighborhood;
    residence.street = street;
    residence.numberr = numberr;
    residence.complement = complement;
    residence.residence_type = residence_type;
    residence.residence_place = residence_place;
    residence.price = price;
    residence.allow_smokers = allow_smokers;
    residence.allow_pets = allow_pets;
    residence.wifi = wifi;
    residence.kitchen = kitchen;
    residence.tv = tv;
    residence.ac = ac;
    residence.notebook_work = notebook_work;
    residence.grill = grill;
    residence.pool = pool;
    residence.parking = parking;
    residence.num_rooms = num_rooms;
    residence.num_bathrooms = num_bathrooms;
    residence.current_residents = current_residents;
    residence.max_residents = max_residents;

    const updatedResidence = residenceRepository.save(residence);

    return updatedResidence;
  }
}
export default UpdateResidenceService;
