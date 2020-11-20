/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRepository } from 'typeorm';
import Residence from '../models/Residence';

// import AppError from '../errors/AppError';

interface Request {
  price?: any | undefined;
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
      'SELECT residences.*, users.name, users.email, users.avatar,users.bio, users.phone, users.is_host, users.user_city, users.user_state, users.is_email_available, users.is_phone_available, users.is_location_available FROM residences  INNER JOIN users ON residences.owner_id = users.id WHERE (residences.available = true) AND ((CAST($1 AS FLOAT)) IS NULL OR (CAST(price as FLOAT)) <= (CAST($1 AS FLOAT))) AND (CAST($2 AS TEXT)  IS NULL OR residences.residence_place = $2) AND CAST($3 AS TEXT) IS NULL OR residences.city = $3 ORDER BY residences.id',
      [price, residence_place, city],
    );
    return residences;
  }
}
export default ListResidencesService;
