import { DocumentBuilder } from "@nestjs/swagger";

export const SwaggerConfiguration = new DocumentBuilder()
    .setTitle('Template Nest API')
    .setDescription('Template Nest API')
    .setVersion('1.0.0')
    .build();