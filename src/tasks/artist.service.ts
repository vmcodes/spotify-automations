import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { characters, getArtistData } from "src/helpers/artistSearch";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Artist } from "./artist.schema";
import { Genre } from "./genre.schema";

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<Artist>,
    @InjectModel(Genre.name) private genreModel: Model<Genre>,
  ) {}

  @Cron("0 0,6,12,18 * * *", {
    name: "notifications",
    timeZone: "America/New_York",
  })
  async handleCron() {
    let artists;
    let itr = 0;
    let char = 0;

    do {
      try {
        artists = await getArtistData(characters[char], itr * 50, 50);

        itr++;
      } catch (error) {
        console.log("error finding artists:", error);
      }

      if (artists === -1) {
        console.log("completed character:", characters[char]);
        itr = 0;
        char++;
      } else {
        for (const _ in artists) {
          const newArtist = new this.artistModel(artists[_]);

          try {
            await newArtist.save();
            console.log("artist saved:", artists[_].name);
          } catch {
            await newArtist.updateOne(artists[_]);
          }

          const genres = artists[_].genres;

          genres.forEach(async (genre) => {
            const newGenre = new this.genreModel({
              genre: genre,
              popularity: 0,
              playlistCount: 0,
            });

            try {
              await newGenre.save();
            } catch {
              console.log("error saving gnere:", genre);
            }
          });
        }
      }
    } while (characters[char] !== "|");
  }
}
