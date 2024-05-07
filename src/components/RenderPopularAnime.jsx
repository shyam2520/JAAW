import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";
import { GetPopularAnime,GetTopEpisode } from "../Services/getAnime";
let globalPageNo = 1;
function RenderPopularAnime() {
  const [popAnime, setPopAnime] = useState({isLoading: true,data: [],pageNo: 1});
  const [loadingData, setLoadingData] = useState(false);
  let navigate = useNavigate();
  function preventDefault(e) {  
    return  e.preventDefault();
  }
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
        if(!loadingData){
          setLoadingData(true);
          document.addEventListener('scroll', preventDefault, { passive: false });
          GetTopEpisode().then((response) => {
            // globalPageNo = globalPageNo + 1;
            setPopAnime(
              (prevPopAnime) => ({
                pageNo: prevPopAnime.pageNo + 1,
                isLoading: false,
                data:  [...response?.data?.results],
              })
              );
            });
            document.removeEventListener('scroll', preventDefault);
            setLoadingData(false);
        }
    }
  };
  useEffect(() => {
    setPopAnime({ ...popAnime, isLoading: true });
    // globalPageNo=1;
    GetTopEpisode().then((response) => {
      // globalPageNo = globalPageNo + 1;
      console.log(response)
      setPopAnime({
        isLoading: false,
        data: response?.data?.results,
        pageNo: 1,
      });
    });

    // window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  if (popAnime.isLoading) {
    return <div className="loading "> Loading ...</div>;
  } else {
    if (!popAnime.data || popAnime.data.length === 0) {
      return <div className="loading">No Popular Shows Available</div>;
    }
    //  const AnimeCards=MakeCard(popAnime.data,navigate)
    else {
      return (
        <div className="grid grid-cols-5 gap-4 w-full">
          {popAnime.data.map((d) => {
            return (
              <div
                key={d.id + d.episodeId}
                title={d.title}
                style={{ height: "350px" }}
                alt ={d.title}
                className="flex flex-col bg-transparent  cursor-pointer group "
                onClick={() => navigate(`/${d.id}/${d.episodeId}`,{state:d})}
                // onClick={() => {
                //   // const inputString = d.id;
                //   // const values = inputString.split("-");

                //   // // Find the index of the target value
                //   // const targetIndex = values.indexOf("episode");

                //   // // If the target value is not found, return the original string
                //   // if (targetIndex === -1) {
                //   //   return inputString;
                //   // }

                //   // // Concatenate values up to the target index using "-"
                //   // const resultString = values.slice(0, targetIndex).join("-");
                //   // console.log(resultString);

                //   // navigate(`/${resultString}/${d.episodeNumber}`);
                // }}
              >
                <div className="relative w-full h-5/6 font-Carousel-text  rounded-md">
                  <img
                    className="rounded-md h-full w-full z-0 object-fill"
                    alt={d.image}
                    src={d.image}
                  />
                  <div className="absolute rounded-md top-0 left-0 w-full h-full z-10 group-hover:bg-black opacity-25 "></div>
                  <div className="absolute  bottom-0 left-0 px-2 h-6 z-20 font-medium bg-ep-bg rounded-tr-lg rounded-bl-md  text-white ">
                    EP {d.episodeNumber}
                  </div>
                  {/* <div className="absolute  top-0 right-0 px-2 h-6 z-20 font-medium   bg-yellow-600 rounded-bl-lg rounded-tr-md  text-white">
                  {d.sub}
                </div> */}
                </div>
                <div className="cardText font-Carousel-text whitespace-normal overflow-hidden w-full font-normal text-center text-gray-500 group-hover:text-white mt-2 ">
                  {d.title}
                </div>
              </div>
            );
          })
        }
        {loadingData && <div className="loading">Loading ...</div>}
        </div>
      );
    }
  }
}

export { RenderPopularAnime };
