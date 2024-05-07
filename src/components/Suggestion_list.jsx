import { useNavigate } from "react-router-dom";
import "../../src/App.css";

function SuggestionData({ data, navigate }) {
  return (
    <div
      key={data?.id}
      title={data?.title}
      className={`dropdown-data ${data.selected ? "bg-indigo-700" : ""} hover:bg-indigo-700 group`}
      onClick={() =>
        navigate(`/anime/${data?.id}`, { replace: true ,state:data})
      }
    >
      <div key={data?.id} className="rounded-full flex-none w-2/12 overflow-hidden m-3  bg-black  ">
        <img src={data?.image} alt={data?.image} title={data?.title} className=" object-cover" />
      </div>
      <div className="truncate flex-1  m-3 ">
        <div className={`suggested-title ${data.selected?"text-white":"text-gray-400"} group-hover:text-white`}>
          {data?.title}
        </div>
        <div className={`suggested-data-info ${data.selected?"text-white":"text-gray-500"} group-hover:text-white`}>
          <div className=" text-sm ">{data?.releaseDate}</div>
          <i className={`dropdown-dot ${data.selected?"bg-white":"bg-gray-500"}   group-hover:bg-white`}></i>
          <div className="text-sm">{data.subOrDub}</div>
          {/* <i className={`dropdown-dot ${data.selected?"bg-white":"bg-gray-500"} group-hover:bg-white`}></i>
          <div className="text-sm"> EP - {data.total_episode}</div> */}
        </div>
      </div>
    </div>
  );
}

export function SuggestionList({ animeData }) {
  const navigate = useNavigate();
  if (!animeData || !animeData.data || !animeData.data.length) return <></>;
  else {
    animeData = animeData.data;
    return (
      <div className="rounded-md mt-2  bg-gray-800">
        <ul id="SuggestedList">
          {animeData.map((show_data) => {
            console.log(show_data);
            return (
              <li key={show_data.ID}>
                <SuggestionData data={show_data} navigate={navigate} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
