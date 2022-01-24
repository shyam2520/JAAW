import "../../src/App.css";
function paginator(params, setanimeData, increment) {
  let newparams = params;
  newparams["page"] += increment;
  delete newparams["current_page"];
  delete newparams["total_page"];
  delete newparams["setanimeData"];
  setanimeData({ loading: true, animeParams: newparams });
}
function CardsPagination({ params }) {
  let setanimeData = params.setanimeData;
  return (
    <div className="flex flex-row h-10 justify-center">
      <div
        className={`${
          params.page <= 1 ? "bg-button-disabled" : "bg-ep-bg cursor-pointer"
        }  pagination-cards-button-prev`}
        onClick={() => {if(!(params.page <= 1)) paginator(params, setanimeData, -1)}}
      >
        &lt; &nbsp; Previous
      </div>
      <div className="mx-6 mt-1 flex flex-row">
        <div className=" current-page ">{params["current_page"]}</div>
        <div className=" total-page">{params["total_page"]}</div>
      </div>

      <div
        className={`${
          params.page>=params['total_page'] ? "bg-button-disabled" : "bg-ep-bg cursor-pointer"
        }  pagination-cards-button-next`}
        onClick={() => {if(params.page<params.total_page) paginator(params, setanimeData, 1)}}
      >
        Next &nbsp; &gt;
      </div>
    </div>
  );
}
export { CardsPagination };
