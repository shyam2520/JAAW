import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetAnimeByName } from "../Services/getAnime";
import AnimeCard from "./Cards";
import { CardsPagination } from "./Cards_Pagination";
import { TopAnime } from "./TopAnime";
import "../../src/App.css";
const Anime_Params = {
  character: "",
  page: 1,
  limit: 30,
  action: "load_anime_list",
};
async function getanimeData(animeName, animeData, setanimeData) {
  if (animeName) {
    try {
      let response = await GetAnimeByName(animeName, animeData.animeParams);
      response.data=response.data.sort((a,b) => a.year<b.year?1:-1)
      setanimeData({
        data: response,
        loading: false,
        animeParams: animeData.animeParams,
      });
    } catch (error) {
      console.log(error);
      setanimeData({
        data: [],
        loading: false,
        animeParams: animeData.animeParams,
      });
    }
  }
}
export default function SearchResults() {
  const { animeName } = useParams();
  const [animeData, setanimeData] = useState({
    loading: true,
    animeParams: Anime_Params,
  });
  useEffect(() => {
    console.log("SET STATE\n");
    setanimeData({ loading: true, animeParams: Anime_Params });
  }, [animeName]);

  console.log(animeData);
  if (animeData.loading) {
    getanimeData(animeName, animeData, setanimeData);
    return <div className="loading">Loading ...</div>;
  }
  if (!animeData ||!animeData.data ||animeData.data.length === 0 ||animeData.data.data.length === 0) {
    return (
      <div className="loading">
        <div>No shows Available</div>
      </div>
    );
  }
  return (
      <div className="flex flex-col w-full m-4">
        <div className="mt-5">
          <AnimeCard data={{ name: animeName, data: animeData.data.data }} />
          {animeData.data.data.length >= 20 ? (
            <CardsPagination
              params={{
                ...animeData.animeParams,
                total_page: animeData.data.total_page,
                current_page: animeData.data.current_page,
                setanimeData: setanimeData,
              }}
            />) : (<></> )}
        </div>
      </div>

  );
}
