import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { PPTModule } from './ppt/ppt.module';
import { ReaderModule } from './reader/reader.module';
import { Session } from './chat/entities/session.entity';
import { Message } from './chat/entities/message.entity';
import { SessionTempFile } from './chat/entities/session-temp-file.entity';
import { PPTOperation } from './ppt/entities/ppt-operation.entity';
import { PDFFile } from './reader/entities/pdf-file.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: process.env.DB_HOST || 'localhost',
      // port: parseInt(process.env.DB_PORT) || 3306,
      // username: process.env.DB_USERNAME || 'root',
      // password: process.env.DB_PASSWORD || 'root',
      // database: process.env.DB_DATABASE || 'chat',
      host:  'localhost',
      port:  3306,
      username:  'root',
      password:  '220140625',
      database:  'chat',
      entities: [Session, Message, SessionTempFile, PPTOperation, PDFFile],
      synchronize: true, // 仅在开发环境使用
    }),
    ChatModule,
    PPTModule,
    ReaderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
