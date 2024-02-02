import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AuthModule } from '../auth/auth.module'

import { User, UserSchema } from './schemas'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), AuthModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
