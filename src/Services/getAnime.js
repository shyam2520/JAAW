import axios from "axios";

const ANIMEAPIGOGO = axios.create({
  baseURL: "https://jaaw-flask.onrender.com",
  // baseURL: "http://127.0.0.1:8000"
});
const Anime_Params={
  keyword:"",
  page:1,
  limit:30,
  action:'search'
}

async function GetAnimeByName(animetitle,anime_params=Anime_Params) {
  anime_params['character']=animetitle;
  anime_params['page']=1;
  let api_res = await ANIMEAPIGOGO.get("/search", {
    params: anime_params,
  });
  let res = api_res["data"]  
  return res;
}

async function GetAnimeDetails(animetitle) {
  let api_res = await ANIMEAPIGOGO.get(`/info/${animetitle}`, {
    // params:  {
    //   'id':animetitle
    // },
  });
  return api_res["data"];
}

async function GetEpisode( anime_id) {
  let episode_params={
    movie_id:anime_id
  }
  let api_res = await ANIMEAPIGOGO.get(`/watch/${anime_id}`);
  return api_res.data;
}

async function GetTopEpisode(type)
{
  // let top_anime_params={
  //   action:'top_view',
  //   type_of_view:type,
  //   page:1,
  //   limit:40,
  // }
  let api_res=await ANIMEAPIGOGO.get('/recent');
  return api_res;
}

async function GetPopularAnime(page=1)
{
  let pop_anime_params={
    // action:'polular_ongoing_update',
    // limit:limit,
    page:page
  }
  let api_res=await ANIMEAPIGOGO.get('/popular');
  console.log(api_res)
  return api_res;
}
export {
  GetAnimeByName,
  GetEpisode,
  GetTopEpisode,
  GetPopularAnime,
  GetAnimeDetails
};
