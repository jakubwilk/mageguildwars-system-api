import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ExceptionService } from '../exception/exception.service'

import { User, UserSchema } from './schemas'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService, ExceptionService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
