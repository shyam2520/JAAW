import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GetAnimeByName } from "../Services/getAnime";
import AnimeCard from "./Cards";
async function getAnimeResults(animeName, setanimeResults) {
  if (animeName) {
    try {
      let response = await GetAnimeByName(animeName);
      setanimeResults({ data: response, loading: false });
    } catch (error) {
      console.log(error);
      setanimeResults({ data: [], loading: false });
    }
  }
}
export function SearchResults() {
  const { animeName } = useParams();
  const [animeResults, setanimeResults] = useState({ loading: true });

  if (animeResults.loading) {
    getAnimeResults(animeName, setanimeResults);
    return <div className="text-white">Loading ...</div>;
  }
  if (!animeResults || !animeResults.data.length) {
    return <div className="text-white">No shows Available</div>;
  }
  return (
    <div className="flex">
      <AnimeCard data={{ name: animeName, data: animeResults.data }} />
    </div>
  );
}
