import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";
import { GetAnimeDetails, GetEpisode } from "../Services/getAnime";
import { RangeEpisodes } from "./RangeEpisodes.jsx";
import ReactHlsPlayer from "react-hls-player";


async function getEpisodes(showId, episodeId) {
  let response = await GetEpisode(episodeId);
  let animedata = await GetAnimeDetails(showId);
  return { episodes: animedata.episodes, animedata: animedata ,currentEpisode : response };
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
        const ep_data = episode;
        return (
          <li key={ep_data["id"]}>
            <div
              className={` ${
                ep_data["name"] === currentEp["episodename"]
                  ? "bg-ep-bg text-white"
                  : " bg-ep-no-selected text-ep-text-no-selected"
              }  font-Carousel-text cursor-pointer w-20 h-8  text-center pt-1 rounded-sm `}
              onClick={() =>
                currentEp.setcurrEpisode({
                  currEpisodeSRC: ep_data["url_player"],
                  episodename: ep_data["name"],
                })
              }
            >
              {ep_data["sort_order"]}
            </div>
          </li>
        );
      })}
    </div>
  );
}

export default function Episodes() {
  const [episode, setEpisode] = useState({ isLoading: true });
  const [toggleEpisodes, setToggleEpisodes] = useState(false);
  const [currEpisode, setcurrEpisode] = useState({
    currEpisodeSRC: "",
    episodename: "",
  });
  let { animeName, id } = useParams();
  const [epId, setEpId] = useState(-1);
  // const {state} =useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (epId && epId !== -1) {
          setToggleEpisodes(true);
          response = await getEpisodes(animeName, epId);
          setcurrEpisode({
            currEpisodeSRC: response.currentEpisode.sources[0].url,
            episodename: epId != -1 ? epId : id,
          });
          setToggleEpisodes(false);
        } else {
          setEpisode({ isLoading: true });
          response = await getEpisodes(animeName, id);
          setcurrEpisode({
            currEpisodeSRC: response.currentEpisode.sources[0].url,
            episodename: epId != -1 ? epId : id,
          });
          setEpisode({ isLoading: false, ...response });
        }
      
      } catch (error) {
        console.error("Error fetching data:", error);
        setEpisode({ isLoading: false, error: true });
      }
    };
    fetchData();
  }, [animeName, id, epId]);
  if (episode.isLoading) {
    return <div className="loading">Loading ...</div>;
  } else {
    return (
      <div className="m-5">
        <div className="flex flex-row font-Carousel-text">
          <div
            className=" text-gray-500 hover:text-white cursor-pointer "
            onClick={() => navigate("/", { replace: true })}
          >
            Home
          </div>
          <div className=" text-gray-500">&nbsp; &gt; &nbsp;</div>
          <div className=" text-gray-400">
            {episode?.animedata?.title}
          </div>
        </div>
        <div className="my-5">
          <ReactHlsPlayer
            src={toggleEpisodes?'/Users/shyam/DEV/JAAW/src/Assets/loading.gif':currEpisode.currEpisodeSRC}
            
            autoPlay={true}
            controls={true}
            width="100%"
            // height="75%"
            style={{height:'500px'}}
          />
        </div>
        <div className=" bg-ep-list py-5 px-5 rounded-md">
          <ul>
            <div className="grid grid-cols-10 gap-y-2 gap-x-2">
              {episode?.episodes.map((ep) => {
                return (
                  <li key={ep?.id}>
                    <div
                      className={` ${
                        ep.id === currEpisode["episodename"]
                          ? "bg-ep-bg text-white"
                          : " bg-ep-no-selected text-ep-text-no-selected"
                      }  font-Carousel-text cursor-pointer w-20 h-8  text-center pt-1 rounded-sm `}
                      onClick={() => setEpId(ep.id)}
                    >
                      {ep.number}
                    </div>
                  </li>
                );
              })}
            </div>
          </ul>
        </div>

        <div className="rounded-md my-4 p-5 bg-ep-list">
          <div className="flex flex-row">
            <div className=" w-1/5 rounded-md  object-fill">
              <img
                src={episode?.animedata?.image}
                alt={episode?.animedata?.name}
                className="w-full h-full rounded-md"
              />
            </div>

            <div className="flex flex-col w-3/4 pl-10 ">
              <div>
                <h1 className=" font-Carousel-text text-white font-medium text-xl">
                  {episode?.animedata?.title}
                </h1>
              </div>
              <div className=" mt-5 text-sm text-ep-text-no-selected whitespace-normal font-Carousel-text text-justify">
                {episode?.animedata?.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    // return (
    //   <div className="p-5">
    //     <div className="flex flex-row font-Carousel-text">
    //       <div
    //         className=" text-gray-500 hover:text-white cursor-pointer "
    //         onClick={() => navigate("/", { replace: true })}
    //       >
    //         Home
    //       </div>
    //       <div className=" text-gray-500">&nbsp; &gt; &nbsp;</div>
    //       <div className=" text-gray-400">{show}</div>
    //     </div>

    //     <div className=" my-10">
    //       <center>
    //         <iframe
    //           title={currEpisode.currEpisodeSRC}
    //           src={currEpisode.currEpisodeSRC}
    //           height={"500px"}
    //           allowFullScreen={true}
    //           className='w-full'
    //           scrolling="no"
    //         />
    //       </center>
    //     </div>

    //     <div>
    //       <div className=" bg-ep-list py-5 px-5 rounded-md">
    //       {episode.total_page>1?<div className=" mb-5">
    //         <RangeEpisodes data={{ ...episode,setEpisode:setEpisode }} />
    //       </div>:<></>}
    //         <ul>
    //           <RenderEpisodes
    //             episodeData={{ ...episode }}
    //             currentEp={{ ...currEpisode, setcurrEpisode: setcurrEpisode }}
    //           />
    //         </ul>
    //       </div>
    //     </div>

    //     <div className="rounded-md my-4 p-5 bg-ep-list">
    //       <div className="flex flex-row">
    //         <div className=" w-1/5 rounded-md  object-fill">
    //           <img src={state.image} alt={state.image} className="w-full h-full rounded-md"/>
    //         </div>

    //         <div className="flex flex-col w-3/4 pl-10 ">
    //           <div>
    //             <h1 className=" font-Carousel-text text-white font-medium text-xl">{state.post_title}</h1>
    //           </div>
    //           <div className=" mt-5 text-sm text-ep-text-no-selected whitespace-normal font-Carousel-text text-justify">
    //             {state.post_content}
    //           </div>

    //         </div>

    //       </div>
    //     </div>

    //   </div>
    // );
  }
}
