import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";
import { GetPopularAnime } from "../Services/getAnime";
import {MakeCard} from "./Cards"
async function getpopanime(setPopAnime) {
  let res = await GetPopularAnime(1, 30);
  setPopAnime({ isLoading: false, data: res.data.data.data });
}

function RenderPopularAnime() {
  const [popAnime, setPopAnime] = useState({ isLoading: true });
  let navigate=useNavigate();
  if (popAnime.isLoading) {
    getpopanime(setPopAnime);
    return <div className="loading "> Loading ...</div>;
  }
  else
  { 
       if(!popAnime.data || popAnime.data.length===0 ) return <div className="loading">No Popular Shows Available</div>
       const AnimeCards=MakeCard(popAnime.data,navigate) 
      return( <div className="grid grid-cols-5 gap-4 w-full"> {AnimeCards}</div>);
  }
}

export { RenderPopularAnime };
