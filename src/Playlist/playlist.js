import React from "react";
import { useState } from "react";
import styles from "./playlist.module.css";



function Playlist({selectedTracks, callbackToRemove}) {

  const [playlistName, setPlaylistName] = useState("");
  function handleInputChange(event) {
    setPlaylistName(event.target.value);
  }
   
  const handleRemove = (removeId) => {
     callbackToRemove(removeId);
  };

  const urisToSend =[];
  for ( let i =0; i < selectedTracks.length; i++) {
    urisToSend.push(selectedTracks[i].uri);
    console.log(urisToSend);
  }
  

  return (
    <>
      <div id="wrapper_playlist" className={styles}>
        <h1>Your Playlists</h1>
        <input
          type="text"
          placeholder="Enter your new Playlist"
          value={playlistName}
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
