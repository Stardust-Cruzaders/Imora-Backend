/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse } from 'dotenv/types';
import { getRepository } from 'typeorm';
import Residence from '../models/Residence';

// import AppError from '../errors/AppError';

interface Request {
  price?: number | undefined;
  residence_place?: any | undefined;
  city?: any | undefined;
}
class ListResidencesService {
  public async execute({
    price,
    residence_place,
    city,
  }: Request): Promise<Residence[]> {
    const residenceRepository = getRepository(Residence);

    const residences = await residenceRepository.query(
      'SELECT residences.*, users.name, users.email, users.avatar,users.bio, users.phone, users.is_host, users.user_city, users.user_state, users.is_email_available, users.is_phone_available, users.is_location_available FROM residences  INNER JOIN users ON residences.owner_id = users.id WHERE (residences.available = true) AND (CAST($1 AS TEXT)  IS NULL OR residences.residence_place = $1) AND CAST($2 AS TEXT) IS NULL OR residences.city = $2 ORDER BY residences.id',
      [residence_place, city],
    );

    function filterByPrice(residence: Residence): boolean {
      return Number(residence.price) <= price;
    }
    if (price) {
      console.log('filtrando');
      const filteredResidences = residences.filter(filterByPrice);
      return filteredResidences;
    }

    return residences;
  }
}
export default ListResidencesService;
