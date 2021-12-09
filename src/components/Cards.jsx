import axios from "axios";
import React, { useState } from "react";

function makeCard(data) {
  if(!data ||!data.length)
    return(<div>No Shows Available</div>)
  data = data.map((d) => {
    // console.log(d);
    return (
      <div
        className="flex flex-col outline-none border-2 w-1/5"
        onClick={() => {
          console.log(d.episodes);
        }}
      >
        <img
          // style={{ height: '100px', width: 50 }}
          className="rounded-md ml-4 h-full"
          alt="name of the show"
          src={d.poster}
        />
        <p className="ml-4 mt-2"> {d.title}</p>
      </div>
    );
  });
  return data;
}

export default function AnimeCard({ data }) {
  if (!data) return <></>;
  const ShowCards = makeCard(data.data);
  return (
    <div  className="flex flex-wrap ">
      {ShowCards}
    </div>
  );
}
