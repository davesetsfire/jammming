import "./App.css";
import Searchbar from "./Searchbar/searchbar";
import SearchResults from "./SearchResults/searchResults";
import Playlist from "./Playlist/playlist";
import { useState } from "react";


function App() {
  
  
  const [results, setResults] = useState([]);

  
  function handleSearch(results) {
    setResults(results);
    alert(results);
  }


   const [selectedTracks, setSelectedTracks] = useState([]);

   function addTrack(changedTrack) {
    setSelectedTracks((prev) => [...prev, changedTrack])
   }
   
   function deleteTracks(trackToRemove) {
    const playlistWithoutRemoved = selectedTracks.filter((song) => song.id !==trackToRemove)
    setSelectedTracks(playlistWithoutRemoved)
   }
  
  return (
    <div className="App">
      <Searchbar
        onGetResults={handleSearch}
        />
        

      <div className="playlist_with_tracks">
        <SearchResults 
          result={results}
          addTrack={addTrack}
          selectedTracks={selectedTracks}
           />  

        <Playlist
          selectedTracks={selectedTracks}
          callbackToRemove={deleteTracks} />
          
      </div>
    </div>
  );
}

export default App;
