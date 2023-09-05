import React from "react";
import styles from "./searchResults.module.css";
import {useState, useEffect} from "react";


function SearchResults(props) {
    const {result, callback, selectedTracks} = props;

    const [selected, setSelected] = useState([]);
    
    const addToPlaylist = (targetId) => {
        const selectedSong = result.find((item) => item.id === targetId);
        const included = selected.includes(selectedSong);
        if(!included) {
        setSelected((prev) => [...prev, selectedSong] );
        }
    
    };
    useEffect(() => {
        callback(selected);}, [callback, selected]);
    console.log(selected);
    return (
        <>
        <div id="result_wrapper" className={styles} selected={selected}>
        <h1>Your Results</h1>
        <ul className={styles.ul}>
            {result.map((song) => (
                <li key={song.id}>
                 <p>{song.title} - {song.artist}</p>
                 <p>{song.album} - {song.id}</p>  
                 <button onClick={() => addToPlaylist(song.id)} >Add to Playlist</button>   
                </li>
            ))
            }
        </ul>
        </div>
        </>
    )
}
export default SearchResults;