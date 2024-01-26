import { ChangeEvent, useContext, useRef } from "react";
import { PlacesContext } from "../context";
import { SearchResult } from ".";

export const SearchBar = () => {
  const debounceRef = useRef<number>();
  const {searchPlacesByTerm} = useContext(PlacesContext);

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const query = e.target.value;
    debounceRef.current = setTimeout(() => {
      console.log(query);
      searchPlacesByTerm(query);
    }, 1000);
  };
  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Search place here ..."
        onChange={onQueryChange}
      />
      <SearchResult />
    </div>
  );
};

export default SearchBar;
