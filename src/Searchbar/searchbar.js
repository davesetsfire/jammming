import React, { useState, useCallback } from "react";
import styles from "./searchbar.module.css"

const SearchBar = (props) => {
    
    const [input, setInput] = useState('');
    const handleChange = useCallback((event) => {
        setInput(event.target.value)
    }, [])
    
    
    const search =() => {
        props.onSearch(input);
    };


    return (
        <>
        <div id="background" className={styles.div}>
        <input type="text" 
                onChange={handleChange}/>
        <button type="submit"
                onClick={search}
                >Search</button>
        </div>
        </>
    )
}
export default SearchBar;