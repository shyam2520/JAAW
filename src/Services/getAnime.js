import axios from "axios";

const ANIMEAPIGOGO = axios.create({
  baseURL: "https://jaaw-api.herokuapp.com/",
});
const IMAGEPATH = "https://files.gogoanime123.com/";
const Anime_Params={
  character:"",
  page:1,
  limit:30,
  action:'load_anime_list'
}

async function GetAnimeByName(animetitle,anime_params=Anime_Params) {
  anime_params['character']=animetitle

  let api_res = await ANIMEAPIGOGO.get("/anime", {
    params: anime_params,
  });
  let res = api_res["data"]
  // console.log(res)
  
  return res;
}

async function GetEpisode(animetitle, anime_id) {
  let episode_params={
    movie_id:anime_id,
    page:1,
    limit:100,
    action:'load_list_episode'
  }
  let api_res = await ANIMEAPIGOGO.get("/episode", {
    params: episode_params,
  });
  // console.log(api_res);
  return api_res.data;
}

export {
  GetAnimeByName,
  GetEpisode,
};
