import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetEpisode } from "../Services/getAnime";
async function getEpisodes(showname, showid, setEpisode, setcurrEpisode) {
  let response = await GetEpisode(showname, showid);
  let episodes = response.data.map((f) => {
    return (
      <li>
        <div
          key={f["id"]}
          style={{ cursor: "pointer" }}
          className="bg-orange-600 border-4 border-black"
          onClick={() => setcurrEpisode({ currEpisodeSRC: f["url_player"] })}
        >
          {f["name"]}
        </div>
      </li>
    );
  });
  setEpisode({ isLoading: true, episodes: episodes });
  let firstEpIdx = response.data[0];
  setcurrEpisode({ currEpisodeSRC: firstEpIdx["url_player"] });
}

export default function Episodes() {
  const [episode, setEpisode] = useState({ isLoading: false });
  const [currEpisode, setcurrEpisode] = useState({ currEpisodeSRC: "" });
  let { show, id } = useParams();
  useEffect(() => {
    setEpisode({ isLoading:false });
  }, [id]);
  if (!episode.isLoading) {
    getEpisodes(show, id, setEpisode, setcurrEpisode);
    return <div>Loading ...</div>;
  } else {
    return (
      <div>
        <div className="text-white">{show}</div>
        <ul className="flex flex-wrap text-white">{episode.episodes}</ul>
        <br />
        <center>
          <iframe
            title={currEpisode.currEpisodeSRC}
            src={currEpisode.currEpisodeSRC}
            height={"500px"}
            width={"850px"}
            scrolling="no"
          />
        </center>
      </div>
    );
  }
}
