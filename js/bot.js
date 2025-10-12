import Mastodon from "mastodon-api";
import { createNextToot, nextPattern } from "./compose.js";
import fs from "fs";
import 'dotenv/config';

console.log("mastodon bot starting...");

let paramsText = createNextToot();

const M = new Mastodon({
  client_key: process.env.MASTODON_CLIENT_KEY,
  client_secret: process.env.MASTODON_CLIENT_SECRET,
  access_token: process.env.MASTODON_ACCESS_TOKEN,
  api_url: process.env.MASTODON_API_URL, 
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
});

(async () => {
  // Upload media & description
  const mediaResp = await M.post("media", {
    file: fs.createReadStream(nextPattern.image),
    description: nextPattern.imageDescription,
  });

  // Use the returned media ID and put it in Object
  const paramsMedia = {
    media_ids: [mediaResp.data.id],
  };

  // merge Parameters
  let nextParams = Object.assign(paramsText, paramsMedia);

   // Post status with media
  await M.post(
    "statuses",
    nextParams,
    (error, data) => {
      if (error) {
        console.error(error);
      } else {
        console.log(data);
      }
    }
  );
})();
