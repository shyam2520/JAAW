import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";

function SearchBarIcon({ searchUpdate }) {
  // console.log(searchUpdate)
  return (
    <div onClick={() => searchUpdate((prevState) => !prevState)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}

function NavSearch() {
  return (
    <div>
      <input
        type={"text"}
        placeholder={"Search ..."}
        className="outline-none bg-black text-white text-sm"
      />
    </div>
  );
}

export function NavBar() {
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex flex-row m-5">
            <div className="m-2 cursor-pointer">
              <img
                src="https://animepahe.com/app/images/apdoesnthavelogotheysaidapistooplaintheysaid.svg"
                width={"130px"}
                height={"120px"}
                onClick={()=>navigate('/')}
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
              {/* {!isSearch ? (
                <SearchBarIcon searchUpdate={setIsSearch} />
              ) : (
                <NavSearch />
              )} */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
