export default function Carousel_Gen(data,navigate) {
  return data.map((data, idx) => {
    let desc = data.description.en;
    desc = desc.split(" ");
    if (desc.length >= 35) desc = desc.slice(0, 35);
    desc = desc.join(" ");
    desc += "...";
    return (
      <div key={idx} className="relative" style={{ height: 400 }}>
        <img src={data.bannerImage.original.url} alt ={data.titles.canonical} className="h-full " />
        <div className="h-full w-full absolute   top-0 bg-black opacity-40 "></div>
        <h1 className="absolute top-20 left-20 text-white font-bold  font-Carousel-text text-5xl">
          {data.titles.canonical}
        </h1>
        <p className="text-white text-justify absolute top-36 left-20  w-1/3">
          {desc}
        </p>
        <div className=" bg-indigo-600  absolute bottom-24 px-8 py-2 rounded-full left-20 cursor-pointer" onClick={()=>navigate(`/results/${data.titles.canonical}` ,{replace:true})}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline-block mb-1 mr-1"
            viewBox="0 0 20 20"
            fill=" white"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-white "> WATCH </span>
        </div>
      </div>
    );
  });
}
