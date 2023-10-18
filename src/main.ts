// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API - Skills')
    .setDescription(
      'Skills é um projeto da primeira turma de Back-End da Aprendizagem Industrial do SENAI que consiste em um sistema de match entre clientes e projetos. Um ambiente onde projetos e usuários se encontram com base em características desejadas.'
    )
    .setContact('SA-Back-End', 'https://github.com/SA-Back-End', '')
    .setVersion('1.0')

    .addTag('Auth', 'Tudo sobre autenticação', {
      description: 'Saiba mais',
      url: 'https://github.com/SA-Back-End',
    })
    .addTag('User', 'Tudo sobre os usuários', {
      description: 'Saiba mais',
      url: 'https://github.com/SA-Back-End',
    })
    .addTag('Formation', 'Tudo sobre formações', {
      description: 'Saiba mais',
      url: 'https://github.com/SA-Back-End',
    })
    .addTag('Institution', 'Tudo sobre instituições', {
      description: 'Saiba mais',
      url: 'https://github.com/SA-Back-End',
    })
    .addTag('Experience', 'Tudo sobre experiências', {
      description: 'Saiba mais',
      url: 'https://github.com/SA-Back-End',
    })
    .addTag('Certificates', 'Tudo sobre certificados', {
      description: 'Saiba mais',
      url: 'https://github.com/SA-Back-End',
    })
    .addTag('Post', 'Tudo sobre postagens', {
      description: 'Saiba mais',
      url: 'https://github.com/SA-Back-End',
    })
    .addTag('Project', 'Tudo sobre projetos', {
      description: 'Saiba mais',
      url: 'https://github.com/SA-Back-End',
    })
    .addTag('Screen_Stick', 'Tudo sobre curtidas', {
      description: 'Saiba mais',
      url: 'https://github.com/SA-Back-End',
    })
    .addTag('Project_Role', 'Tudo sobre cargos de projeto', {
      description: 'Saiba mais',
      url: 'https://github.com/SA-Back-End',
    })

    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
