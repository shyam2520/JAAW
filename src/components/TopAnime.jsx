import { useState } from "react";
import { GetTopEpisode } from "../Services/getAnime";


const IMAGEPATH = "https://files.gogoanime123.com/";
async function GetTopAnime(type, settopanimeData) {
  let res = await GetTopEpisode(type);
  settopanimeData({ isLoading: false, data: res.data.data });
}

function RenderTopAnime({ data }) {
  return (
    <ul>
      {data.map((anime,idx) => {
        return (
          <li key={anime.post_title} className="font-Carousel-text text-white">
            <div className="flex flex-row">
                <div className=" rounded-md w-28 h-20 mr-2">
                    <img className=" h-full w-full" src={IMAGEPATH+anime.image}/>
                </div>
              <div className=" whitespace-normal w-3/4">{anime.post_title}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function TopAnime() {
  const [topanimeData, settopanimeData] = useState({ isLoading: true });
  if (topanimeData.isLoading) {
    GetTopAnime("day", settopanimeData);
    return <></>;
  } else {
    return (
      <div className=" border-2 p-5 ">
        <RenderTopAnime data={topanimeData.data} />
      </div>
    );
  }
}
export { TopAnime };
