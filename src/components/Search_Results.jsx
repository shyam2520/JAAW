import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetAnimeByName } from "../Services/getAnime";
import { AnimeCard } from "./Cards";
import { CardsPagination } from "./Cards_Pagination";
import "../../src/App.css";
// const Anime_Params = {
//   keyword: "",
//   page: 1,
//   limit: 30,
//   action: "search",
// };
async function getanimeData(animeName, animeData, setanimeData) {
  if (animeName) {
    try {
      let response = await GetAnimeByName(animeName, animeData.animeParams);
      // response.data.data=response.data.data.sort((a,b) => a.year<b.year?1:-1)
      setanimeData({
        data: response.results,
        loading: false,
        animeParams: {},
      });
    } catch (error) {
      setanimeData({
        data: [],
        loading: false
      });
    }
  }
}
export default function SearchResults() {
  const { animeName } = useParams();
  const [animeData, setanimeData] = useState({
    loading: true,
  });
  useEffect(() => {
    // setanimeData({ loading: true, animeParams: {} });
    getanimeData(animeName, animeData, setanimeData);
  }, [animeName]);

  if (animeData.loading) {
    return <div className="loading">Loading ...</div>;
  }
  else if (animeData.loading === false && (!animeData ||!animeData.data  ||animeData.data.length === 0)) {
    return (
      <div className="loading">
        <div>No shows Available</div>
      </div>
    );
  }
  else{
    return (
        <div className="flex flex-col w-full m-4">
          <div className="mt-5">
            <AnimeCard data={{ name: animeName, data: animeData.data }} />
            {animeData.data.length >= 20 ? (
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
}
