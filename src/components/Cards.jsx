// import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function makeCard(data, navigate) {
  console.log(data);
  if (!data || !data.length) return <div>No Shows Available</div>;
  data = data.map((d) => {
    return (
      <div
        key={d.title}
        className="flex flex-col outline-none border-2 w-1/5"
        onClick={() => {
          if (d.id == null) d.id = "";
          navigate(`/episodes/${d.title}/${d.id}`);
        }}
      >
        <img
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
  const navigate = useNavigate();
  console.log(data);
  if (!data || !data.data || !data.data.length) return <></>;
  const ShowCards = makeCard(data.data, navigate);
  return <div className="flex flex-wrap ">{ShowCards}</div>;
}
