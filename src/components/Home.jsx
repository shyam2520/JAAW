import { Carousel } from "react-responsive-carousel";
import Carousel_Gen from "./Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useQuery, gql } from "@apollo/client";
import { RenderPopularAnime } from "./RenderPopularAnime";
import { TopAnime } from "./TopAnime";
import { useNavigate } from "react-router-dom";

const TRENDING_ANIME = gql`
  query {
    globalTrending(first: 4, last: 4, mediaType: ANIME) {
      nodes {
        titles {
          canonical
        }
        bannerImage {
          original {
            url
          }
        }
        description
      }
    }
  }
`;

export default function MainHome() {
  const { data, loading, error } = useQuery(TRENDING_ANIME);
  let navigate=useNavigate();
  if (loading) return <div className="loading">LOADING ....</div>;

  if (error) return <div>{error}</div>;
  else
  {
  // data={...data,navigate:navigate};
  return (
    <div className=" flex flex-col">
      <div>
        <Carousel
          axist="horizontal"
          autoPlay={true}
          interval={2500}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          transitionTime={1000}
        >
          {Carousel_Gen(data.globalTrending.nodes,navigate)}
        </Carousel>
      </div>

      <div className="mt-10 py-10 px-5">
        <div className=" flex flex-col">
          <div className=" text-white text-2xl font-Carousel-text font-semibold pl-14 mb-4 "> Recently Updated </div>
          <div className="flex flex-row">
            <div className="mx-10 p-2 w-8/12">
              <RenderPopularAnime />
            </div>
            <div className="w-1/4 ">
              <TopAnime />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
}
