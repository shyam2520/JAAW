import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { GetEpisode } from "../Services/getAnime";
// const getEpisodeURL = "https://jaaw-api.herokuapp.com/episode?title=";

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
  let firstEpIdx = response.data.findIndex((f) => f.name == "1");
  setcurrEpisode({ currEpisodeSRC: response.data[firstEpIdx]["url_player"] });
}

export function Episodes() {
  const [episode, setEpisode] = useState({ isLoading: false });
  const [currEpisode, setcurrEpisode] = useState({ currEpisodeSRC: "" });
  let { show, id } = useParams();
  if (!episode.isLoading) {
    getEpisodes(show, id, setEpisode, setcurrEpisode);
    return <div>Loading ...</div>;
  } else {
    return (
      <div>
        <div>{show}</div>
        <ul className="flex flex-wrap">{episode.episodes}</ul>
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
