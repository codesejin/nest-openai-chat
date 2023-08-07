import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // .env 파일을 로드하기 위한 설정
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
