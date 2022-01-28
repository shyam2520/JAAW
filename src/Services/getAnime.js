import axios from "axios";

const ANIMEAPIGOGO = axios.create({
  baseURL: "https://jaaw-api.herokuapp.com/",
});
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
  return res;
}

async function GetEpisode(animetitle, anime_id,page_val=1) {
  console.log('page val = ',page_val)
  let episode_params={
    movie_id:anime_id,
    page:page_val,
    limit:100,
    action:'load_list_episode'
  }
  let api_res = await ANIMEAPIGOGO.get("/episode", {
    params: episode_params,
  });
  return api_res.data;
}

async function GetTopEpisode(type)
{
  let top_anime_params={
    action:'load_top_view_movie',
    type:type
  }
  let api_res=await ANIMEAPIGOGO.get('/topanime',{params:top_anime_params});
  return api_res;
}

async function GetPopularAnime(page=1,limit=25)
{
  let pop_anime_params={
    action:'load_popular_ongoing_update',
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
