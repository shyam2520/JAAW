import  "../../src/App.css";
function Loading() {
  return (
    <div className=" bg-gray-800 mt-2 h-32 rounded-md relative">
      <div className="flex flex-row absolute top-1/2 left-1/2  translateloadingdiv">
        <div className="animechangecolor span1 rounded-full h-4 w-4 bg-indigo-800 mr-4"></div>
        <div className="animechangecolor span2 rounded-full h-4 w-4 bg-indigo-800 mr-4"></div>
        <div className="animechangecolor span3  rounded-full h-4 w-4 bg-indigo-800 "></div>
      </div>
    </div>
  );
}
export { Loading };
