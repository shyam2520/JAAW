import axios from "axios";

const ANIMEAPIGOGO = axios.create({
  baseURL: "https://jaaw-api.herokuapp.com/",
});
const IMAGEPATH = "https://files.gogoanime123.com/";

async function GetAnimeByName(animetitle) {
  let api_res = await ANIMEAPIGOGO.get("/anime", {
    params: {
      name: animetitle,
    },
  });
  let res = api_res;
  if ((res.data["source"] = "GOGO")) {
    res = {
      data: [
        ...res["data"]["data"].map((r) => {
          return {
            title: r["post_title"],
            poster: IMAGEPATH + r["image"],
            id: r["ID"],
          };
        }),
      ],
    };
  }
  return res;
}

async function GetEpisode(animetitle, anime_id) {
  let api_res = await ANIMEAPIGOGO.get("/episode", {
    params: { title: animetitle, id: anime_id },
  });
  // console.log(api_res);
  return api_res.data;
}

export {
  GetAnimeByName,
  GetEpisode,
};
