import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { HotelReservationMsLogger } from './common/logger.interceptor';

async function bootstrap() {
  const logger = new Logger('HotelReservationMicroservice');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'hotel_reservation_microservice',
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  app.useGlobalInterceptors(new HotelReservationMsLogger());
  await app
    .listen()
    .finally(() =>
      logger.log(
        `Hotel Reservation Microservice: EventBus:${process.env.RABBITMQ_URL}`,
      ),
    );
}
bootstrap();
