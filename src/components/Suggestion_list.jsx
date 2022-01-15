import { useState } from "react";
import { useNavigate } from "react-router-dom";

const IMAGEPATH = "https://files.gogoanime123.com/";
function SuggestionData({ data, navigate }) {
  return (
    <div
      key={data.ID}
      className="flex flex-row h-20 border-t-2 border-black   border-solid rounded-b-md  hover:bg-indigo-700 group"
      onClick={() => navigate(`/episodes/${data.post_title}/${data.ID}`)}
    >
      <div className="rounded-full flex-none w-2/12 overflow-hidden m-3  bg-black  ">
        <img src={IMAGEPATH + data.image} className=" object-cover" />
      </div>
      <div className="truncate flex-1  m-3 ">
        <div className=" font-normal truncate font-Carousel-text text-gray-400  group-hover:text-white ">
          {data.post_title}
        </div>
        <div className="flex flex-row mt-1  font-Carousel-text text-gray-500 font-light group-hover:text-white ">
          <div className=" text-sm ">{data.year}</div>
          <i className=" rounded-full h-1 w-1 m-2 bg-gray-500  group-hover:bg-white"></i>
          <div className="text-sm">{data.sub}</div>
          <i className=" rounded-full h-1 w-1 m-2  bg-gray-500  group-hover:bg-white"></i>
          <div className="text-sm"> EP - {data.total_episode}</div>
        </div>
      </div>
    </div>
  );
}

export function SuggestionList({ animeData }) {
  const navigate = useNavigate();
  if (!animeData || !animeData.data || !animeData.data.length) return <></>;
  else {
    animeData = animeData.data.sort((a, b) => (a.year < b.year ? 1 : -1));
    animeData = animeData.slice(0, 5);
    console.log(animeData);
    return (
      <div className="rounded-md mt-2  bg-gray-800 ">
        <ul>
          {animeData.map((show_data) => {
            return (
              <li>
                <SuggestionData data={show_data} navigate={navigate} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
