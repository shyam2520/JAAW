import { GetEpisode, GetAnimeByName } from "../Services/getAnime";

async function switchpage(showname, showid, setEpisode,current_page)
{
  let response = await GetEpisode(showname, showid,current_page);
  let animedata = await getAnimeDetail(showname, showid);
  let restep = [...response.data];
  restep = restep.sort((a, b) => (a["sort_order"] < b["sort_order"] ? -1 : 1));
  setEpisode({isLoading: false,episodes: restep,total_page: response.total_page,
    current_page:response.current_page,animeData: animedata});
}

async function getAnimeDetail(showname, id) {
    let response = await GetAnimeByName(showname);
    response = response.data.filter((data) => data.ID === id);
    return response[0];
  }

function RangeEpisodes({ data }) {
    let low = 0,high = 100;
    let range_list = [];
    for (let i = 0; i <= parseInt(data.total_page); i++) {
      if (i === 0 )
      {  
        low=(parseInt(data.total_page)-i) * 100;
        range_list.push(
          <div key={i} 
          className={`cursor-pointer mr-3 font-Carousel-text ${data.current_page===i?'text-white':'text-ep-text-no-selected'} text-sm `}
          onClick={()=>switchpage(data.animeData.post_title,data.animeData.ID,data.setEpisode,i)} >
            
            {`${low}-${data.animeData.total_page}`}</div>
        );
      }
      else
      {
        low=(parseInt(data.total_page)-i) * 100;
        high=low+100;
         range_list.push(
         <div key={i}
        className={`cursor-pointer mr-3 font-Carousel-text ${data.current_page===i?'text-white':'text-ep-text-no-selected'} text-sm`}
         onClick={()=>switchpage(data.animeData.post_title,data.animeData.ID,data.setEpisode,i)} >{`${low}-${high}`}</div>
         );
     ;}
    }
    return <div className=" flex flex-row">{ range_list.map( d=> d)}</div>;
  }
  export {RangeEpisodes}