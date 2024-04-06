import React, { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import "./SearchBar.css";

const SearchBar = ({ products }) => {
  const { searchTerm, setSearchTerm, resetSearchTerm } = useSearch();
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const onSelect = (value, option) => {
    navigate(`/product/${option.id}`);
    resetSearchTerm();
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (!value) {
      setOptions([]);
    } else {
      const filteredOptions = products
        .filter((product) =>
          product.title.toLowerCase().includes(value.toLowerCase()),
        )
        .map((product) => ({ value: product.title, id: product.id }));

      setOptions(filteredOptions);
    }
  };

  return (
    <AutoComplete
      className="custom-search-bar"
      options={options}
      onSelect={onSelect}
      placeholder="Search products"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
