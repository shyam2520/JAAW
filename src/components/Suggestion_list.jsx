import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../src/App.css";
const IMAGEPATH = "https://files.gogoanime123.com/";

function SuggestionData({ data, navigate }) {
  console.log(data);
  return (
    <div
      key={data.ID}
      className={`dropdown-data ${
        data.selected ? "bg-indigo-700" : ""
      } hover:bg-indigo-700 group`}
      onClick={() =>
        navigate(`/episodes/${data.post_title}/${data.ID}`, { replace: true })
      }
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
          <i className=" dropdown-dot  group-hover:bg-white"></i>
          <div className="text-sm">{data.sub}</div>
          <i className=" dropdown-dot group-hover:bg-white"></i>
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
    animeData = animeData.data;
    return (
      <div className="rounded-md mt-2  bg-gray-800">
        <ul id="SuggestedList">
          {animeData.map((show_data) => {
            return (
              <li key={show_data.ID}>
                <SuggestionData data={show_data} navigate={navigate} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
