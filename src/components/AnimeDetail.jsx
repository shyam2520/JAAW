import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";
import { GetAnimeDetails } from "../Services/getAnime";

// import {RangeEpisodes} from "./RangeEpisodes.jsx"

async function getAnimeDetail(showname) {
  return await GetAnimeDetails(showname);
}

function AnimeDetail() {
  const navigate = useNavigate();
  const [animeData, setanimeData] = useState({ isLoading: true });
  const { id } = useParams();
  useEffect(() => {
    setanimeData({ isLoading: true });
    getAnimeDetail(id).then((response) => {
      setanimeData({ isLoading: false, data: response });
    });
  }, [id]);
  if (animeData.isLoading) {
    return <div className="loading">Loading ...</div>;
  } else {
    return (
      <div>
        <div className="rounded-md my-4 p-5 bg-ep-list">
          <div className="flex flex-row">
            <div className=" w-1/5 rounded-md  object-fill">
              <img
                src={animeData?.data?.image}
                alt={animeData?.data?.id}
                className="w-full h-full rounded-md"
              />
            </div>

            <div className="flex flex-col w-3/4 pl-10 ">
              <div>
                <h1 className=" font-Carousel-text text-white font-medium text-xl">
                  {animeData?.data?.title}
                </h1>
              </div>
              <div className=" mt-5 text-sm text-ep-text-no-selected whitespace-normal font-Carousel-text text-justify">
                {animeData?.data?.description}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-md my-4 px-5 py-4 bg-ep-list grid grid-cols-10 gap-y-2 gap-x-6">
          {animeData?.data?.episodes.map((ep) => {
            return (
              <li key={ep.id} style={{'listStyle':'none'}}>
                <div
                  style={{ color: "#fff", backgroundColor: "#e9005a" }}
                  className={`text-ep-text-no-selected  font-Carousel-text cursor-pointer w-20 h-8  text-center pt-1 rounded-sm `}
                    onClick={  () =>navigate(`/${id}/${ep.id}`)        }
                >
                  {ep.number}
                </div>
              </li>
            );
          })}
        </div>
      </div>
    );
  }
}

export { AnimeDetail };
