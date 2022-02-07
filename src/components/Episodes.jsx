import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";
import { GetEpisode } from "../Services/getAnime";
import {RangeEpisodes} from "./RangeEpisodes.jsx"

const IMAGEPATH = "https://files.gogoanime123.com/";

async function getEpisodes(showname, showid, setEpisode, setcurrEpisode,current_page=1) {
  let response = await GetEpisode(showname, showid,current_page);
  // let animedata = await getAnimeDetail(showname, showid);
  let restep = [...response.data];


  setEpisode({isLoading: false,episodes: restep,total_page: response.total_page,
    current_page:response.current_page,
    // animeData: animedata
  });
  let firstEp = restep[0];
  setcurrEpisode({
    currEpisodeSRC: firstEp["url_player"],
    episodename: firstEp["name"],
  });
}

// async function getAnimeDetail(showname, id) {
//   let response = await GetAnimeByName(showname);
//   response = response.data.filter((data) => data.ID === id);
//   return response[0];
// }

function RenderEpisodes({ episodeData, currentEp }) {
  return (
    <div className="grid grid-cols-10 gap-y-2 gap-x-6">
      {episodeData.episodes.map((episode) => {
        return (
          <li key={episode["id"]}>
            <div
              className={` ${
                episode["name"] === currentEp["episodename"] ? "bg-ep-bg text-white": " bg-ep-no-selected text-ep-text-no-selected"
              }  font-Carousel-text cursor-pointer w-20 h-8  text-center pt-1 rounded-sm `}
              onClick={() =>
                currentEp.setcurrEpisode({
                  currEpisodeSRC: episode["url_player"],
                  episodename: episode["name"],
                })
              }
            >
              {episode["name"]}
            </div>
          </li>
        );
      })}
    </div>
  );
}



export default function Episodes() {
  const [episode, setEpisode] = useState({ isLoading: true });
  const [currEpisode, setcurrEpisode] = useState({currEpisodeSRC: "",episodename: ""});
  let { show, id } = useParams();
  const {state} =useLocation();
  console.log('passing state',state)
  let navigate = useNavigate();
  useEffect(() => {
    setEpisode({ isLoading: true });
  }, [id]);
  if (episode.isLoading) {
    getEpisodes(show, id, setEpisode, setcurrEpisode);
    return <div className="loading">Loading ...</div>;
  } else {
    return (
      <div className="p-5">
        <div className="flex flex-row font-Carousel-text">
          <div
            className=" text-gray-500 hover:text-white cursor-pointer "
            onClick={() => navigate("/", { replace: true })}
          >
            Home
          </div>
          <div className=" text-gray-500">&nbsp; &gt; &nbsp;</div>
          <div className=" text-gray-400">{show}</div>
        </div>

        <div className=" my-10">
          <center>
            <iframe
              title={currEpisode.currEpisodeSRC}
              src={currEpisode.currEpisodeSRC}
              height={"500px"}
              allowFullScreen={true}
              className='w-full'
              scrolling="no" 
            />
          </center>
        </div>

        <div>
          <div className=" bg-ep-list py-5 px-5 rounded-md">
          {episode.total_page>1?<div className=" mb-5">
            <RangeEpisodes data={{ ...episode,setEpisode:setEpisode }} />
          </div>:<></>}
            <ul>
              <RenderEpisodes
                episodeData={{ ...episode }}
                currentEp={{ ...currEpisode, setcurrEpisode: setcurrEpisode }}
              />
            </ul>
          </div>
        </div>

        <div className="rounded-md my-4 p-5 bg-ep-list">
          <div className="flex flex-row">
            <div className=" w-1/5 rounded-md  object-fill">
              <img src={IMAGEPATH+state.image} alt={state.image} className="w-full h-full rounded-md"/>
            </div>

            <div className="flex flex-col w-3/4 pl-10 ">
              <div>
                <h1 className=" font-Carousel-text text-white font-medium text-xl">{state.post_title}</h1>
              </div>
              <div className=" mt-5 text-sm text-ep-text-no-selected whitespace-normal font-Carousel-text text-justify">
                {state.post_content}
              </div>

            </div>

          </div>
        </div>

      </div>
    );
  }
}
