import "./App.css";
import Searchbar from "./Searchbar/searchbar";
import SearchResults from "./SearchResults/searchResults";
import Playlist from "./Playlist/playlist";
import { useState } from "react";
import songs from "./SongsDatabase";
import playlistArray from "./Playlist/playlistmock";

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  function handleSearch(e) {
    const searchTerm = e.target.value;
    setInput(searchTerm);
  }

  function handleOnSearch() {
    const filteredResults = songs.filter((song) =>
      song.artist.toLowerCase().includes(input.toLowerCase())
    );
    setResults(filteredResults);
  }

  const [playlists, setPlaylists] = useState(playlistArray);
  function handleOnAddClick(newPlaylist) {
    setPlaylists((prevPlaylist) => [newPlaylist, ...prevPlaylist]);
  };
   const [selectedTracks, setSelectedTracks] = useState([]);

  return (
    <div className="App">
      <Searchbar
        value={input}
        onChange={handleSearch}
        onSearch={handleOnSearch}/>

      <div className="playlist_with_tracks">
        <SearchResults 
          result={results}
          callback={setSelectedTracks}
          selectedTracks={selectedTracks} />

        <Playlist
          onAddClick={handleOnAddClick}
          playlists={playlists}
          selectedTracks={selectedTracks}
          callbackToRemove={setSelectedTracks} />
          
      </div>
    </div>
  );
}

export default App;
