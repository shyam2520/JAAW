import React, { useState } from "react";
import AnimeCard from "./Cards";
import {GetAnimeByName} from "../Services/getAnime"

async function getAnimeData(animeData, setanimeData) {
  if (animeData.name) {
    try {
      let response = await GetAnimeByName(animeData.name);
      // console.log(response.data);
      setanimeData({ ...animeData, data: response.data });
    } catch (error) {
      console.log(error);
      setanimeData({ ...animeData, data: {} });
    }
  }
}

export default function SearchBar() {
  const [animeData, setanimeData] = useState({});
  return (
    <div>
      <div className="flex justify-center">
        <input
          type="text"
          className="bg-gray-400  mt-4 outline-none rounded-md border-2  border-blue-200 "
          onKeyPress={(event) => {
            if (event.key === "Enter") getAnimeData(animeData, setanimeData);
          }}
          onInput={(event) => {
            setanimeData({ ...animeData, name: event.target.value });
          }}
        />
        <button
          className="rounded-md border-blue-200 bg-gray-200"
          onClick={() => getAnimeData(animeData, setanimeData)}
        >
          Search
        </button>
      </div>
      <div>
        <AnimeCard data={animeData} />
      </div>
    </div>
  );
}
