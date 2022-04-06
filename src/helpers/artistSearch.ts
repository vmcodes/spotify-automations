import { sleep } from "src/utils";
import { constants } from "src/constants";
import { getAuthToken } from "./getToken";
const SpotifyWebApi = require("spotify-web-api-node");

const credentials = {
  clientId: constants.CLIENT_ID,
  clientSecret: constants.CLIENT_SECRET,
};

const spotifyApi = new SpotifyWebApi(credentials);

// Search tracks whose artist's name contains a character
export async function getArtistData(
  char: string,
  offset: number,
  limit: number,
) {
  try {
    const token = await getAuthToken();

    spotifyApi.setAccessToken(token);

    let response = await spotifyApi.searchArtists(char, {
      offset: offset,
      limit: limit,
      fields: "items",
    });

    await sleep(10000);

    console.log("offset", offset);

    let artists = response.body.artists.items;
    if (artists) {
      return artists;
    } else {
      return -1;
    }
  } catch {
    return -1;
  }
}

export const characters: string[] = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "!",
];
