import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import * as fs from 'fs'
import { stringify } from 'yaml'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const options = new DocumentBuilder().setTitle('Title').setDescription('description').setVersion('1.0').build()
  const document = SwaggerModule.createDocument(app, options)

  app.enableCors({
    origin: process.env['CLIENT_URL'],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credential',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Headers',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers',
      'x-refresh-token',
      'x-access-token',
    ],
  })

  if (process.env['NODE_ENV'] === 'development') {
    fs.writeFileSync('mgw-domain.yaml', stringify(document))
  }

  SwaggerModule.setup('/api', app, document)
  app.use(cookieParser())
  await app.listen(parseInt(process.env['API_PORT'] as string))
}

bootstrap()
