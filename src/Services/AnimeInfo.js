import axios from "axios";
import { createProxyMiddleware } from "http-proxy-middleware";
const GOGOANIME = "https://gogoanime.mom/my-ajax";

export default async function searchAnime(animeName) {
  // createProxyMiddleware()

  const params = {
    character: animeName,
    limit: 100,
    action: "load_anime_list",
  };

  let response = await axios.get(GOGOANIME, { params });
  response = await response.json();
  console.log(response);
}
