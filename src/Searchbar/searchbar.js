import React, { useState } from "react";
import styles from "./searchbar.module.css";
import Spotify from "../spotify";

const SearchBar = (props) => {
  const [input, setInput] = useState('');
  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const [submittedValue, setSubmittedValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedValue(input);
    setInput('');
    console.log(submittedValue);
  };

  function handleResults(results) {
    props.onGetResults(results);
    
  }

  return (
    <>
      <div id="background" className={styles.div}>
        <form onSubmit={handleSubmit} >
          <input type="text" onChange={handleChange} value={input}></input>
          <button type="submit">Search</button>
        </form>
        <Spotify searchTerm={submittedValue} onSearch={handleResults} />
      </div>
    </>
  );
};

export default SearchBar;
