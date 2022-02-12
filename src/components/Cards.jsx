import React from "react";
import { useNavigate } from "react-router-dom";

const IMAGEPATH = "https://files.gogoanime123.com/";
 export function MakeCard(data, navigate) {
  if (!data || !data.length) return <div>No Shows Available</div>;
  let data_ele = data.map((d) => {
    return (
      <div
        key={d.post_title}
        style={{'height':'350px'}}
        className="flex flex-col bg-transparent  cursor-pointer group "
        onClick={() => navigate(`/episodes/${d.post_title}/${d.ID}`,{state:d})}
      >
        <div className="relative w-full h-5/6 font-Carousel-text  rounded-md">
          <img
            className="rounded-md h-full w-full z-0 object-fill"
            alt={d.image}
            src={IMAGEPATH + d.image}
          />
          <div className="absolute rounded-md top-0 left-0 w-full h-full z-10 group-hover:bg-black opacity-25 "></div>
          <div className="absolute  bottom-0 left-0 px-2 h-6 z-20 font-medium bg-ep-bg rounded-tr-lg rounded-bl-md  text-white ">
            EP {d.total_episode_published} / {d.total_episode}
          </div>
          <div className="absolute  top-0 right-0 px-2 h-6 z-20 font-medium   bg-yellow-600 rounded-bl-lg rounded-tr-md  text-white">
            {d.sub}
          </div>
        </div>
        <div className="h-1/6 font-Carousel-text whitespace-normal overflow-hidden w-full font-normal text-center text-gray-500 group-hover:text-white mt-2 ">
          {d.post_title}
        </div>
      </div>
    );
  });
  return data_ele;
}

function AnimeCard({ data }) {
  const navigate = useNavigate();
  if (!data || !data.data) return <></>;
  const ShowCards = MakeCard(data.data, navigate);
  return (
    <div className="grid grid-cols-5 gap-4 p-4 " >
      {ShowCards}
    </div>
  );
}

export {AnimeCard}
