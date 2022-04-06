import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Artist extends Document {
  @Prop({ type: Object })
  external_urls: Object;

  @Prop({ type: Object })
  followers: Object;

  @Prop()
  genres: string[];

  @Prop()
  href: string;

  @Prop({ required: true, unique: true })
  id: string;

  @Prop()
  images: Object[];

  @Prop()
  name: string;

  @Prop()
  popularity: number;

  @Prop()
  type: string;

  @Prop()
  uri: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
