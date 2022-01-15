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
      <div className=" ml-3">
        <div className="flex flex-col w-80 ">
          <div>
            <input
              type="text"
              className="bg-gray-500 w-full py-2 pl-4 outline-none rounded-full font-Carousel-text font-normal  text-white "
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
              <div>
                {animeData ? (
                  <SuggestionList animeData={{ ...animeData }} />
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export { getAnimeData, SearchBar };
