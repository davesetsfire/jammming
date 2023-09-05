import React from "react";
import { useState, useEffect } from "react";
import styles from "./playlist.module.css";



function Playlist({selectedTracks, callbackToRemove}) {
  const [input, setInput] = useState("");
  function handleInputChange(event) {
    setInput(event.target.value);
  }
   
  const [removed, setRemoved] = useState([]);
  const handleRemove = (removeId) => {
     const songToRemove = selectedTracks.find((item) => item.id === removeId);
     const updatedPlaylist = selectedTracks.filter(song => song !== songToRemove);
     setRemoved(updatedPlaylist);
     console.log(removed);
  };
  
  useEffect(() => {
    callbackToRemove(removed);}, [callbackToRemove, removed]);

  return (
    <>
      <div id="wrapper_playlist" className={styles}>
        <h1>Your Playlists</h1>
        <input
          type="text"
          placeholder="Enter your new Playlist"
          value={input}
          onChange={handleInputChange}
        ></input>
        <ul className={styles.ul}>
            {selectedTracks.map((song) => (
                <li key={song.id}>
                 <p>{song.title} - {song.artist}</p>
                 <p>{song.album} - {song.id}</p>  
                 <button onClick={() => handleRemove(song.id)} >remove</button>   
                </li>
            ))
            }
        </ul>
        <button>Save in Spotify</button>
      </div>
    </>
  );
}
export default Playlist;
