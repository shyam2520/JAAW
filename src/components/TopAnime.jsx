import { useState } from "react";
import { GetTopEpisode,GetPopularAnime } from "../Services/getAnime";
import "../../src/App.css";
import { TopAnimeData } from "./TopAnimeData";
import { useNavigate } from "react-router-dom";
const IMAGEPATH = "https://statics.gogoanime.mom/";
// async function GetTopAnime(, settopanimeData) {
//   let res = await GetTopEpisode(type);
//   settopanimeData({ isLoading: false, duration: type, data: res.data.data });
// }

async function GetTopAnime(settopanimeData) {
  let res = await GetPopularAnime();
  settopanimeData({ isLoading: false,  data: res.data.results });
}

function RenderTopAnime({data}) {
  let navigate = useNavigate();
  return (
    <ul>
      {data?.map((anime, idx) => {
        let cat = (anime.categories);
        if (idx === 0) {
          return (
            <li key={anime.post_title}> 
              <div
                className={`relative h-40 w-full rounded-md mb-5 group cursor-pointer`}
                onClick={() =>
                  navigate(`/anime/${anime.id}`, {
                    // replace: true,
                    // state:anime
                  })
                }
              >
                <img
                  src={anime.image}
                  alt={anime.image}
                  className="h-full w-full rounded-md object-cover opacity-75"
                />
                <div
                  className="absolute z-10 bottom-0 left-0 text-white"
                  style={{ width: "356px" }}
                >
                  <div className="flex flex-col  ">
                    <div className="  px-2 text-base truncate font-Carousel-text  text-white group-hover:text-white">
                      {anime.title}
                    </div>
                    <div className="flex flex-row p-2">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5   text-gray-300 group-hover:text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className=" font-Carousel-text text-gray-300 truncate group-hover:text-white text-sm pl-2">
                        {anime.releaseDate}
                      </div>
                      {/* <i
                        className={
                          "h-2 w-2 rounded-full mt-1.5 ml-2  text-gray-300 group-hover:bg-white "
                        }
                      ></i>

                      <div className=" font-Carousel-text  text-gray-300 group-hover:text-white text-sm pl-2">
                        {cat?cat[0].name:""}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        }

        return (
          <li key={anime.title}>
            <div className="flex flex-row h-20 mb-2 cursor-pointer group">
              <div className=" rounded-md h-full w-3/12 ">
                <img
                  className=" h-full w-full rounded-md"
                  alt={anime.image}
                  src={anime.image}
                />
              </div>
              <TopAnimeData data={{ ...anime, category: cat }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function changeDuration(type, setDuration) {
  setDuration({ isLoading: true, duration: type });
}

function TopAnimeMenu({ switchanimeData }) {
  return (
    <div className="  flex justify-between  mb-4">
      <div className=" text-lg font-semibold text-white font-Carousel-text">
        TOP ANIME
      </div>
      <div className=" flex flex-row font-Carousel-text text-sm  pt-1 mr-4">
        <div
          className={`topanimemenu ${
            switchanimeData.duration === "day" ? "text-white" : "text-gray-400"
          } `}
          onClick={() => {
            changeDuration("day", switchanimeData.settopanimeData);
          }}
        >
          Today
        </div>
        <div
          className={`topanimemenu ${
            switchanimeData.duration === "week" ? "text-white" : "text-gray-400"
          }  `}
          onClick={() => {
            changeDuration("week", switchanimeData.settopanimeData);
          }}
        >
          Week
        </div>
        <div
          className={`topanimemenu ${switchanimeData.duration === "month"? "text-white": "text-gray-400" } `}
          onClick={() => {
            changeDuration("month", switchanimeData.settopanimeData);
          }}
        >
          Month
        </div>
      </div>
    </div>
  );
}

function TopAnime() {
  const [topanimeData, settopanimeData] = useState({
    isLoading: true,
    // duration: "day",
  });
  if (topanimeData.isLoading) {
    GetTopAnime(settopanimeData);
    return <div className="loading">Loading ...</div>;
  } else {
    return (
      <div className=" px-5 pt-5 pb-2 bg-ep-list rounded-md ">
        {/* <TopAnimeMenu
          switchanimeData={{
            ...topanimeData,
            settopanimeData: settopanimeData,
          }}
        /> */}
        <RenderTopAnime data={topanimeData.data} />
      </div>
    );
  }
}
export { TopAnime };
