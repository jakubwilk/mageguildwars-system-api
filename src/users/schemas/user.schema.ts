import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { v4 } from 'uuid'

import { UserGroupEnum } from '../models'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop({ unique: true, default: () => v4() })
  uid: string

  @Prop({ unique: true })
  email: string

  @Prop()
  password: string

  @Prop({ default: UserGroupEnum.USER })
  group: UserGroupEnum

  @Prop({ default: new Date() })
  createdAt: Date

  @Prop({ default: new Date() })
  updatedAt: Date

  @Prop({ default: 3 })
  charactersLimit: number

  @Prop({ default: false })
  isLocked: boolean

  @Prop({ default: false })
  isBanned: boolean

  @Prop({ default: true })
  hasEnabledCharacterCreator: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)
