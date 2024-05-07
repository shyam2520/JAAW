import React, { useEffect, useState } from "react";
import { GetAnimeByName } from "../Services/getAnime";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import { SuggestionList } from "./Suggestion_list";

async function getAnimeData(animeName, setanimeData) {
  if (animeName) {
    try {
      let response = await GetAnimeByName(animeName);
      response = response['results'];
      response = response
      //   .sort((a, b) => (a.year < b.year ? 1 : -1))
        .slice(0, 5);
      setanimeData({ data: response, isLoading: false });
    } catch (error) {
      setanimeData({ data: {}, isLoading: false });
    }
  }
}

function SearchBar() {
  const [animeData, setanimeData] = useState({ isLoading: false });
  const [animeName, setanimeName] = useState("");
  const [selectanime,setSelectAnime]=useState(-1);
  let navigate = useNavigate();
  useEffect(() => {
    setanimeData({ isLoading: true });
    setSelectAnime(-1);
    if (animeName.length >= 3) {
      getAnimeData(animeName, setanimeData);
      setanimeName(animeName);
    } else {
      setanimeName(animeName);
      setanimeData({ data: {}, isLoading: false });
    }
  }, [animeName]);

  function animeSelected(animeData,incrementor)
  {
    let newData = { ...animeData };
    let newanime=selectanime+incrementor;
    if(newanime<0) newanime=animeData.data.length-1;
    if (newData.data && newData.data.length > 0) {
      newData.data=newData.data.map( (show,idx) => {
        if(idx===(newanime%(newData.data.length)))
        {  show.selected=true;
          return show; }
        else 
         { show.selected=false; return show ;}
      });

      setSelectAnime(newanime);
      setanimeData({ isLoading: false, data: newData.data });
   }
  }

  function navigator(event)
  {
    if(selectanime!==-1 && animeData.data&& animeData.data.length>0 )
    { 
      let show =animeData.data[selectanime%animeData.data.length];
      navigate(`/anime/${show.id}`, { replace: true,state:show })
    }
    else navigate(`/results/${event.target.value}`, { replace: true });
  }
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
      <div className=" ml-3 absolute z-30">
        <div className="flex flex-col w-80 ">
          <div>
            <input
              type="text"
              className="bg-gray-500 w-full py-2 pl-4 outline-none rounded-full font-Carousel-text font-normal  text-white "
              onKeyPress={(event) => {
                if (event.key === "Enter") {navigator(event)}}}
              onKeyDown={(event) => {if (event.code === "ArrowDown") {animeSelected(animeData,1)}
                 else if(event.code==="ArrowUp") {animeSelected(animeData,-1)}}
              }
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

  );
}
export { getAnimeData, SearchBar };
