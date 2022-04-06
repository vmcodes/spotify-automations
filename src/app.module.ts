import { Module } from "@nestjs/common";
import { constants } from "./constants";
import { MongooseModule } from "@nestjs/mongoose";
import { TasksModule } from "./tasks/task.module";

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: constants.DATABASE_URI,
        useNewUrlParser: true,
      }),
    }),
  ],
})
export class AppModule {}
