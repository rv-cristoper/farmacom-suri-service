import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setUpSwagger(app: INestApplication) {
  SwaggerModule.setup('doc', app, () => {
    const config = new DocumentBuilder()
      .setTitle('Account Provider V2')
      .addApiKey(
        {
          type: 'apiKey',
          name: 'x-session-id',
          in: 'header',
        },
        'session-id',
      )
      .build();

    return SwaggerModule.createDocument(app, config);
  });
}
