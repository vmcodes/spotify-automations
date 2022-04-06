import { constants } from "src/constants";
const SpotifyWebApi = require("spotify-web-api-node");

const credentials = {
  clientId: constants.CLIENT_ID,
  clientSecret: constants.CLIENT_SECRET,
};

const spotifyApi = new SpotifyWebApi(credentials);

export async function getAuthToken() {
  try {
    let response = await spotifyApi.clientCredentialsGrant();

    return response.body.access_token;
  } catch (error) {
    console.log(error);
  }
}
