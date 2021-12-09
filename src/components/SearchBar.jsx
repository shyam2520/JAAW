import axios from "axios";
import React, { useState } from "react";
import AnimeCard from "./Cards";

const baseurl = "https://jaaw-api.herokuapp.com/anime?name=";

async function getAnimeData(animeData, setanimeData) {
  if (animeData.name) {
    try{

      let response = await axios.get(baseurl + animeData.name);
    //   console.log(data)
    setanimeData({ ...animeData, data: response.data });
    }
    catch(error){
      console.log(error)
      setanimeData({...animeData,data:{}})
    }
    
  }
}

// impor tailwindcss
export default function SearchBar() {
  const [animeData, setanimeData] = useState({});
  return (
    <div>
      <div className="flex justify-center">
        <input
          type="text"
          className="bg-gray-400  mt-4 outline-none rounded-md border-2  border-blue-200 "
          onInput={(event) => {
            setanimeData({ ...animeData, name: event.target.value });
            // console.log(name);
          }}
        />
        <button
          className="rounded-md border-blue-200 bg-gray-200"
          onClick={() => getAnimeData(animeData, setanimeData)}
        >
          Search
        </button>
      </div>
      <div className="border-2 border-red-400 ">
        <AnimeCard data={animeData.data} />
      </div>
    </div>
  );
}
