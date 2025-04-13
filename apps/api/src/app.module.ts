import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LinksModule } from './links/links.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LinksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
