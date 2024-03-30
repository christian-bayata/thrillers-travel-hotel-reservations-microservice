import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { existsSync, mkdirSync } from 'fs';
import * as path from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      expandVariables: true,
    }),
    // HotelReservationMicroserviceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    if (!existsSync(path.join(__dirname, '..', 'logs'))) {
      mkdirSync(path.join(__dirname, '..', 'logs'));
    }
    return;
  }
}
