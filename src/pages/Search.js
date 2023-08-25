import React from "react";
import { useSearch } from "../context/search";
import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <>
      <Jumbotron title={`${values?.results?.length} search found`} />
      <div className="container mt-3">
        <div className="row">
          {values?.results.map((p) => (
            <div className="col-md-6">
              <ProductCard key={p._id} p={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
