import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose'

import { UserGroupEnum } from '../models'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop({ type: MongooseSchema.Types.UUID, unique: true })
  uid: string

  @Prop({ unique: true, required: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  group: UserGroupEnum

  @Prop({ default: new Date(), required: true })
  createdAt: Date

  @Prop({ default: new Date(), required: true })
  updatedAt: Date

  @Prop({ default: 3, required: true })
  charactersLimit: number

  @Prop({ default: false, required: true })
  isLocked: boolean

  @Prop({ default: false, required: true })
  isBanned: boolean

  @Prop({ default: true, required: true })
  hasEnabledCharacterCreator: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)
