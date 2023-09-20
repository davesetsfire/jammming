import React from "react";
import { useState } from "react";
import styles from "./playlist.module.css";

function Playlist({ selectedTracks, callbackToRemove, saveInSpotify}) {
  const [playlistName, setPlaylistName] = useState("");
  function handleInputChange(event) {
    setPlaylistName(event.target.value);
  }

  const handleRemove = (removeId) => {
    callbackToRemove(removeId);
  };
  function handleSaving() {
    const urisToSend = [];
    for (let i = 0; i < selectedTracks.length; i++) {
      urisToSend.push(selectedTracks[i].uri);
    }
    console.log(urisToSend);
    if (urisToSend.length > 0 && playlistName !== '') {
    saveInSpotify(playlistName, urisToSend);
    } else {
      alert('please add Song or Plalist Name')
    }
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
          {selectedTracks.map((song, index) => (
            <li key={index}>
              <p>{song.name}</p>
              <button onClick={() => handleRemove(song.id)}>remove</button>
            </li>
          ))}
        </ul>
        <button onClick={handleSaving} >Save in Spotify</button>
      </div>
    </>
  );
}
export default Playlist;
