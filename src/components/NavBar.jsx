import { useNavigate,Outlet } from "react-router-dom";
import { SearchBar } from "./SearchBar";

export function NavBar() {
  const navigate = useNavigate();
  return (
    <div>
    <nav className="bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex flex-row m-5">
            <div className="m-2 cursor-pointer">
              <img
                src="https://animepahe.com/app/images/apdoesnthavelogotheysaidapistooplaintheysaid.svg"
                alt="anime pahe icon"
                width={"130px"}
                height={"120px"}
                onClick={() => navigate("/")}
              />
            </div>
            <div className="relative">
              <SearchBar />
            </div>
          </div>

          <div className="text-white m-5 font-mono ">
            <ul className="flex space-x-20 m-2 font-Carousel-text font-bold">
              <li className="hover:text-indigo-500 cursor-pointer "> HOME</li>
              <li className="hover:text-indigo-500 cursor-pointer"> SEARCH</li>
              <li className="hover:text-indigo-500 cursor-pointer"> ABOUT </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <Outlet />
    </div>
  );
}
