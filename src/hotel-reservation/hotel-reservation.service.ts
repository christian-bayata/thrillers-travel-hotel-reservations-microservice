import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErrorResponse } from 'src/common/interfaces/error-response.interface';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { HotelReservationRepository } from './hotel-reservation.repository';

@Injectable()
export class HotelReservationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly hotelReservationRepository: HotelReservationRepository,
  ) {}

  private readonly ISE: string = 'Internal Server Error';

  /**
   * @Responsibility: flight booking service method to create a new hotel reservation
   *
   * @param createReservationDto
   * @returns {Promise<any>}
   */

  async createReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<any> {
    try {
      const theReservation =
        await this.hotelReservationRepository.findHotelReservation({
          guestId: createReservationDto?.guestId,
          hotelId: createReservationDto?.hotelId,
        });
      if (theReservation) {
        throw new RpcException(
          this.errR({
            message: 'Reservation already exists for this hotel',
            status: HttpStatus.CONFLICT,
          }),
        );
      }
      return await this.hotelReservationRepository.createHotelReservation(
        createReservationDto,
      );
    } catch (error) {
      throw new RpcException(
        this.errR({
          message: error?.message ? error.message : this.ISE,
          status: error?.error?.status,
        }),
      );
    }
  }

  /*****************************************************************************************************************************
   *
   ****************************************PRIVATE FUNCTIONS/METHODS **********************************
   *
   ******************************************************************************************************************************
   */

  private errR(errorInput: { message: string; status: number }): ErrorResponse {
    return {
      message: errorInput.message,
      status: errorInput.status,
    };
  }
}
