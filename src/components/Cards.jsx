import React from "react";
import { useNavigate } from "react-router-dom";

const IMAGEPATH = "https://files.gogoanime123.com/";
function makeCard(data, navigate) {
  console.log(data);
  if (!data || !data.length) return <div>No Shows Available</div>;
  let data_ele = data.map((d) => {
    return (
        <div
          key={d.post_title}
          className="flex flex-col  bg-transparent rounded-md cursor-pointer group "
          onClick={() => navigate(`/episodes/${d.post_title}/${d.ID}`)}
          
        >
          <div className="relative w-full h-5/6">
            <img
              className="rounded-md h-full w-full z-0"
              alt={d.image}
              src={IMAGEPATH + d.image}
            />
            <div className="absolute rounded-md top-0 left-0 w-full h-full z-10 group-hover:bg-black opacity-25 "></div>
            <div className="absolute  bottom-0 left-0 px-2 h-6 z-20 font-semibold  bg-ep-bg rounded-tr-lg  text-white"> EP {d.total_episode_published} / {d.total_episode}</div>

          </div>
          <div className=" font-Cards-text font-semibold text-center text-gray-500 group-hover:text-white mt-2 ">
            {d.post_title}
          </div>
        </div>
    );
  });
  return data_ele;
}

export default function AnimeCard({ data }) {
  const navigate = useNavigate();
  console.log(data)
  if (!data || !data.data) return <></>;
  const ShowCards = makeCard(data.data, navigate);
  return (
    <div className="grid grid-cols-5 gap-4 w-3/4 mt-4 ml-4 p-4">
      {ShowCards}
    </div>
  );
}
