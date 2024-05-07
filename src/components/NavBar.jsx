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
              {/* <img
                src="/Users/shyam/DEV/JAAW/src/Assets/logo.svg"
                alt="anime pahe icon"
                width={"130px"}
                height={"120px"}
                onClick={() => navigate("/")}
              /> */}
              <div className="hover:text-indigo-500 cursor-pointer" style={{'color':'white','fontSize':'1.25em'}} onClick={()=>navigate('/')}>
                JAAW
              </div>
            </div>
            <div className="relative">
              <SearchBar />
            </div>
          </div>

          <div className="text-white m-5 font-mono ">
            <ul className="flex space-x-20 m-2 font-Carousel-text font-bold">
              <li className="hover:text-indigo-500 cursor-pointer py-auto " onClick={()=>navigate('/')}> HOME</li>
              <li className="hover:text-indigo-500 cursor-pointer" onClick={()=>navigate('/About',{replace:true})}> ABOUT </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <Outlet />
    </div>
  );
}
