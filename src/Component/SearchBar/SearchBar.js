import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const onSubmit = (e) => {
    e?.preventDefault();
    onSearch(term);
  };

  return (
    <div className="search_container">
      <form className="search_bar">
        <input type="text" onChange={(e) => setTerm(e?.target?.value)} />
        <div type="submit" className="submit" onClick={onSubmit}>
          <FaSearch />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
