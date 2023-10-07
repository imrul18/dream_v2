import React from "react";
import PendingCardList from "../Component/CatalogsCard/PendingCardList";
import PaginationList from "../Component/Pagination/PaginationList";
import SearchBar from "../Component/SearchBar/SearchBar";

function PendingCatalog() {
  return (
    <div className="pending_page">
      <div className="section_title">
        <div className="text_area">
          <h2>Pending Catalogs</h2>
          <p>Exploring our collections</p>
        </div>
        <div className="btn_area">
          <button className="btn">Create Release</button>
        </div>
      </div>
      <div className="mt-5">
        <div className="table_title">
          <p>Total {data?.length} entries</p>
          <SearchBar />
        </div>
        <PendingCardList />
        <div className="mt-5">
          <PaginationList/>
        </div>
      </div>
    </div>
  );
}

export default PendingCatalog;
