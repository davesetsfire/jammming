import React, { useState, useCallback } from "react";
import styles from "./searchbar.module.css";

const SearchBar = ({ setSearchTerm }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = useCallback(() => {
    setSearchTerm(input);
    setInput("");
  }, [input, setSearchTerm]);

  return (
    <>
      <div id="background" className={styles.div}>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} value={input}></input>
          <button type="submit">Search</button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
