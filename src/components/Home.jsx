import { Carousel } from "react-responsive-carousel";
import Carousel_Gen from "./Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useQuery, gql } from "@apollo/client";

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
  if (loading) return <div>LOADING ....</div>;

  if (error) return <div>{error}</div>;

  return (
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
        {Carousel_Gen(data.globalTrending.nodes)}
      </Carousel>
    </div>
  );
}
