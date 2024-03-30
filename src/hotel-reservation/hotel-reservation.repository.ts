import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PropDataInput } from 'src/common/utils/util.interface';
import {
  HotelReservation,
  HotelReservationDocument,
} from './schemas/hotel-reservation.schema';

@Injectable()
export class HotelReservationRepository {
  constructor(
    @InjectModel(HotelReservation.name)
    private hotelReservation: Model<HotelReservationDocument>,
  ) {}

  /**
   * @Responsibility: Repo for creating hotel reservation
   *
   * @param data
   * @returns {Promise<HotelReservationDocument>}
   */

  async createHotelReservation(data: any): Promise<HotelReservationDocument> {
    try {
      return await this.hotelReservation.create(data);
    } catch (error) {
      throw new Error(error?.messsage);
    }
  }

  /**
   * @Responsibility: Repo to retrieve hotel reservation
   *
   * @param where
   * @returns {Promise<HotelReservationDocument>}
   */

  async findHotelReservation(
    where: PropDataInput,
    attributes?: string,
  ): Promise<HotelReservationDocument> {
    return await this.hotelReservation.findOne(where).lean().select(attributes);
  }
}
