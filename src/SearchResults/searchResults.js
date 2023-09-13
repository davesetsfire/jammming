import React from "react";
import styles from "./searchResults.module.css";



function SearchResults(props) {
    const {result, addTrack, selectedTracks} = props;
    
    const addToPlaylist = (targetId) => {
        console.log(targetId);
       
        const selectedSong = result.tracks.items.find((item) => item.id === targetId);
        console.log(selectedSong)
        const included = selectedTracks.includes(selectedSong);
            if(!included) {
                addTrack(selectedSong)
            }
    
    };
    
    return (
        <>
        <div id="result_wrapper" className={styles}>
        <h1>Your Results</h1>
        <ul className={styles.ul}>
            {      
            Object.keys(result).length !==0 && result.tracks.items.map((song, index) => (
                <li key={index}>
                 <p>{song.name} {song.track} </p>
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