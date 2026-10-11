import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle("Ticksy API")
    .setDescription("REST API for Ticksy, a help desk system")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("Auth", "Registration, login and session handling")
    .addTag("Users", "User management and profile handling")
    .addTag("Tickets", "Create, assign and track support tickets")
    .addTag("Notifications", "User notifications and read status")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, document, {
    customSiteTitle: "Ticksy API Docs",
    useGlobalPrefix: true,
  });
};

export default setupSwagger;
