import { useNavigate } from "react-router-dom";

function TopAnimeData({ data }) {
    let navigate=useNavigate();
  return (
    <div className="flex flex-col w-9/12 pl-2 " onClick={()=>navigate(`/anime/${data.id}`)}>
      <div className=" px-2 text-base truncate font-Carousel-text text-gray-400 group-hover:text-white">
        {data.title}
      </div>
      <div className="flex flex-row p-2">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5  text-gray-600 group-hover:text-white"
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
        <div className=" font-Carousel-text text-gray-500 group-hover:text-white text-sm pl-2">
          {data.releaseDate}
        </div>
        {/* <i
          className={
            "h-2 w-2 rounded-full mt-1.5 ml-2  bg-gray-500 group-hover:bg-white "
          }
        ></i>

        <div className=" font-Carousel-text text-gray-500 group-hover:text-white text-sm pl-2">
          {data.type?data.type:""}
        </div> */}
      </div>
    </div>
  );
}
export {TopAnimeData}