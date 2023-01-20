import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import "./SearchBar.scss";
import { useState } from "react";

function SearchBar({ setQuery, setFavMode }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchQuery(event.target.value);
      searchQuery && setQuery(searchQuery);
      setFavMode(false);
    }
  };

  const handleSearchClick = () => {
    searchQuery && setQuery(searchQuery);
    setFavMode(false);
  };

  return (
    <div className="container flex-row vertical-center">
      <TextField
        fullWidth
        id="search-field"
        label="Search..."
        variant="standard"
        margin={"normal"}
        onChange={(event) => setSearchQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        aria-label="search"
        size="small"
        className="search-btn"
        onClick={handleSearchClick}
      >
        <SearchIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

export default SearchBar;
