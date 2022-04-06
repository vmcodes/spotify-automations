import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Genre extends Document {
  @Prop({ required: true, unique: true })
  genre: string;

  @Prop({ required: true })
  popularity: number;

  @Prop({ required: true })
  playlistCount: number;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
