import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { UsersModule } from './users/users.module'
import { getEnvVariable } from './utils'
import { AuthModule } from './auth/auth.module';
import { ExceptionModule } from './exception/exception.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(getEnvVariable('DATABASE_URL')),
    UsersModule,
    AuthModule,
    ExceptionModule,
  ],
})
export class AppModule {}
