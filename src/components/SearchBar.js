import React, { useContext, useEffect, useState } from "react";
import { AutoComplete, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import "./SearchBar.css";
import { SearchOutlined } from "@ant-design/icons";
import { CategoryContext } from "../context/CategoryContext";

const SearchBar = ({ products }) => {
  const { searchTerm, setSearchTerm, resetSearchTerm } = useSearch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useContext(CategoryContext);

  const handleActiveCategory = () => {
    setActiveCategory(null);
  };

  const onSelect = (value, option) => {
    handleActiveCategory();
    resetSearchTerm();
    navigate(`/product/${option.id}`);
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

  const handleSearchIcon = () => {
    handleActiveCategory();
    resetSearchTerm();
    navigate(`/search-result`, { state: { filteredProducts } });
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  return (
    <div className="search-bar-container">
      <AutoComplete
        className="custom-search-bar"
        options={options}
        onSelect={onSelect}
        placeholder="Search products"
        value={searchTerm}
        onChange={handleSearch}
      />
      <SearchOutlined
        style={{ color: "white", fontSize: "24px" }}
        onClick={() => handleSearchIcon()}
      />
    </div>
  );
};

export default SearchBar;
