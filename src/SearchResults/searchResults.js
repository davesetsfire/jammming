import React from "react";
import styles from "./searchResults.module.css";



function SearchResults(props) {
    const {result, addTrack, selectedTracks} = props;

    
    const addToPlaylist = (targetId) => {
        const selectedSong = result.find((item) => item.id === targetId);
        const included = selectedTracks.includes(selectedSong);
            if(!included) {
                addTrack(selectedSong)
            }
    
    };
    /*const objectTracks = result.tracks;
    console.log(result.tracks)*/
    return (
        <>
        <div id="result_wrapper" className={styles}>
        <h1>Your Results</h1>
        <ul className={styles.ul}>
            {
            /*objectTracks.map((song) => (
                <li key={song.id}>
                 <p>{song.title} - {song.artist}</p>
                 <p>{song.album} - {song.id}</p>  
                 <button onClick={() => addToPlaylist(song.id)} >Add to Playlist</button>   
                </li>
            ))*/
            }
        </ul>
        </div>
        </>
    )
}
export default SearchResults;