import axios from "axios";

const ANIMEAPIGOGO = axios.create({
  baseURL: "https://jaaw-api.onrender.com/",
  // baseURL: "http://127.0.0.1:8000"
});
const Anime_Params={
  keyword:"",
  page:1,
  limit:30,
  action:'search'
}

async function GetAnimeByName(animetitle,anime_params=Anime_Params) {
  anime_params['keyword']=animetitle

  let api_res = await ANIMEAPIGOGO.get("/anime", {
    params: anime_params,
  });
  let res = api_res["data"]  
  return res;
}

async function GetEpisode(animetitle, anime_id,page_val=0) {
  let episode_params={
    movie_id:anime_id,
    different_page:page_val,
    limit:100,
    action:'list_episode'
  }
  let api_res = await ANIMEAPIGOGO.get("/episode", {
    params: episode_params,
  });
  return api_res.data;
}

async function GetTopEpisode(type)
{
  let top_anime_params={
    action:'top_view',
    type_of_view:type,
    page:1,
    limit:40,
  }
  let api_res=await ANIMEAPIGOGO.get('/topanime',{params:top_anime_params});
  return api_res;
}

async function GetPopularAnime(page=1,limit=25)
{
  let pop_anime_params={
    action:'polular_ongoing_update',
    limit:limit,
    page:page
  }
  let api_res=await ANIMEAPIGOGO.get('/popular_on_going',{params:pop_anime_params});
  return api_res;
}
export {
  GetAnimeByName,
  GetEpisode,
  GetTopEpisode,
  GetPopularAnime
};
