import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ArtistService } from "./tasks/artist.service";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  app.get(ArtistService);
}

bootstrap();
