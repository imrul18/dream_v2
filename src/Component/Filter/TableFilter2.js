import React from "react";

const TableFilter2 = ({ selectedStatus, handleFilter }) => {
  return (
    <div className="table_filter_btn border_bottom">
      <button
        onClick={() => handleFilter("all")}
        className={selectedStatus === "all" ? "active" : ""}
      >
        All
      </button>
      <button
        onClick={() => handleFilter("Published")}
        className={selectedStatus === "Published" ? "active" : ""}
      >
        Published
      </button>   
      <button
        onClick={() => handleFilter("Pending")}
        className={selectedStatus === "Pending" ? "active" : ""}
      >
        Pending
      </button>
      <button
        onClick={() => handleFilter("Ongoing")}
        className={selectedStatus === "Ongoing" ? "active" : "draft"}
      >
        Ongoing
      </button>
      <button
        onClick={() => handleFilter("Failed")}
        className={
          selectedStatus === "Failed" ? "active" : "Failed all_r_d_none"
        }
      >
        Failed
      </button>
      <button
        onClick={() => handleFilter("Rejected")}
        className={selectedStatus === "Rejected" ? "active" : "rej"}
      >
        Rejected
      </button>
      <button
        onClick={() => handleFilter("Correction_request")}
        className={selectedStatus === "Correction_request" ? "active" : "c_req"}
        id="hide_c_request"
      >
        Correction Request
      </button>
    </div>
  );
};

export default TableFilter2;
