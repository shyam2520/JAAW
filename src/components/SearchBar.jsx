import React, { useEffect, useState } from "react";
import { GetAnimeByName } from "../Services/getAnime";
import { useNavigate } from "react-router-dom";
import { SuggestionList, suggestion_list } from "./Suggestion_list";

async function getAnimeData(animeName, setanimeData) {
  if (animeName) {
    try {
      let response = await GetAnimeByName(animeName);
      setanimeData({ data: response, isLoading: false });
    } catch (error) {
      console.log(error);
      setanimeData({ data: {}, isLoading: false });
    }
  }
}

function SearchBar() {
  const [animeData, setanimeData] = useState({ isLoading: true });
  const [animeName, setanimeName] = useState("");
  let navigate = useNavigate();
  console.log("load value", animeData.isLoading);
  useEffect(() => {
    setanimeData({ isLoading: true });
    if (animeName.length >= 3) {
      getAnimeData(animeName, setanimeData);
      setanimeName(animeName);
    } else {
      setanimeName(animeName);
      setanimeData({ data: {}, isLoading: false });
    }
  }, [animeName]);
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex flex-col w-80">
          <div>
            <input
              type="text"
              className="bg-gray-400 w-full px-2 outline-none rounded-full border-2  border-blue-200 "
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  setTimeout(() => navigate(`/results/${animeName}`), 500);
                }
              }}
              onInput={(event) => {
                setanimeName(event.target.value);
              }}
            />
          </div>
          <div>
            {animeData.isLoading ? (
              <div className="text-white">Loading...</div>
            ) : (
              <div>{animeData ? <SuggestionList animeData={{...animeData}} /> : ""}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export { getAnimeData, SearchBar };
