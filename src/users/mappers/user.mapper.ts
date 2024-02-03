import { IClientUser } from '../models'
import { User } from '../schemas'

export const mapUserDataToClient = (user: User): IClientUser => {
  return {
    email: user.email,
    group: user.group,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    charactersLimit: user.charactersLimit,
    isLocked: user.isLocked,
    isBanned: user.isBanned,
    hasEnabledCharacterCreator: user.hasEnabledCharacterCreator,
  }
}
