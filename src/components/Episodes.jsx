import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const getEpisodeURL = "https://jaaw-api.herokuapp.com/episode?title=";

async function getEpisodes(showname, setEpisode,setcurrEpisode) {
  let response = await axios.get(getEpisodeURL + showname);
  let episodes = response.data.data[0].episodes.map((f) => {
    let ep = Object.keys(f)[0];
    return (
      <li>
        <div
          style={{ cursor: "pointer" }}
          className="bg-orange-600 border-4 border-black"
          onClick={() => setcurrEpisode({currEpisodeSRC:f[ep]})}
        >
          {ep}
        </div>
      </li>
    );
  });
  setEpisode({ isLoading: true, episodes: episodes });
  let firstep=Object.values(response.data.data[0].episodes[0])
  setcurrEpisode({currEpisodeSRC:firstep})
}
export function Episodes() {
  const [episode, setEpisode] = useState({ isLoading: false });
  const [currEpisode, setcurrEpisode] = useState({ currEpisodeSRC: "" });
  let { show } = useParams();
  if (!episode.isLoading) {
    getEpisodes(show, setEpisode,setcurrEpisode);
    return <div>Loading ...</div>;
  } else {
    return (
      <div>
        <div>{show}</div>
        <ul className="flex flex-wrap">{episode.episodes}</ul>
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
