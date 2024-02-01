import { Sequelize } from 'sequelize-typescript'

import { Characters } from '../users/entity/characters.entity'
import { Users } from '../users/entity/users.entity'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize: Sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env['DATABASE_HOST'],
        port: 3306,
        username: process.env['DATABASE_USERNAME'],
        password: process.env['DATABASE_PASSWORD'],
        database: process.env['DATABASE_NAME'],
      })
      sequelize
        .authenticate()
        .then(() => {
          console.log('Connection has been established successfully.')
        })
        .catch((err) => {
          console.error('Unable to connect to the database:', err)
        })
      sequelize.addModels([Users, Characters])
      await sequelize.sync()

      return sequelize
    },
  },
]
