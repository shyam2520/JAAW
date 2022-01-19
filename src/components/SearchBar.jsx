import React, { useEffect, useState } from "react";
import { GetAnimeByName } from "../Services/getAnime";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import { SuggestionList } from "./Suggestion_list";

async function getAnimeData(animeName, setanimeData) {
  if (animeName) {
    console.log(animeName);
    try {
      let response = await GetAnimeByName(animeName);
      response = response["data"];
      response = response
        .sort((a, b) => (a.year < b.year ? 1 : -1))
        .slice(0, 5);
      setanimeData({ data: response, isLoading: false });
    } catch (error) {
      console.log(error);
      setanimeData({ data: {}, isLoading: false });
    }
  }
}

function SearchBar() {
  const [animeData, setanimeData] = useState({ isLoading: false });
  const [animeName, setanimeName] = useState("");
  // const [selectanime,setSelectAnime]=useState(0);
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

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  const onHandleChange = (event) => {
    setanimeName(event.target.value);
  };

  const onOptimizedHandler = debounce(onHandleChange, 500);

  return (
    <div className=" absolute z-30">
      <div className=" ml-3">
        <div className="flex flex-col w-80 ">
          <div>
            <input
              type="text"
              text={animeName}
              className="bg-gray-500 w-full py-2 pl-4 outline-none rounded-full font-Carousel-text font-normal  text-white "
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  navigate(`/results/${event.target.value}`, { replace: true });
                }
              }}
              onKeyDown={(event) => {
                if (event.code === "ArrowDown") {
                  let newData = { ...animeData };
                  if (newData.data.length > 0) {
                    // newData.data[%newData.data.length].selected = true;
                    setanimeData({ isLoading: false, data: newData.data });
                  }
                }
              }}
              onKeyUp={(event) => {
                let ele = document.getElementById("suggestions_list");
                if (event.code === "Enter") {
                  ele.style.display = "none";
                } else ele.style.display = "block";
              }}
              onBlur={(event) => {
                setTimeout(() => {
                  setanimeData({ data: {}, isLoading: false });
                }, 100);
              }}
              onChange={onOptimizedHandler}
            />
          </div>
          <div id="suggestions_list" style={{ display: "block" }}>
            {animeData.isLoading ? (
              <Loading />
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
