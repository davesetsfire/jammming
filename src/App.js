import "./App.css";
import Searchbar from "./Searchbar/searchbar";
import SearchResults from "./SearchResults/searchResults";
import Playlist from "./Playlist/playlist";
import { useState } from "react";


function App() {
  function loginToSpotify() {
    var client_id = "2dbe6fc8870d4cc1be69daaf5ab7b650";
    var redirect_uri = "http://localhost:3000";
    var url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(client_id);
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    window.location.href = url;
}

  
  const [results, setResults] = useState([]);
  console.log(results);

  
  function handleResults(results) {
    if(Object.keys(results).lenght !== 0) {
    setResults(results);
    }
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
        onGetResults={handleResults}
        selectedTracks={selectedTracks} />
        

      <div className="playlist_with_tracks">
        <SearchResults 
          result={results}
          addTrack={addTrack}
          selectedTracks={selectedTracks} />  


        <Playlist
          selectedTracks={selectedTracks}
          callbackToRemove={deleteTracks} />
          
      </div>
    </div>
  );
}

export default App;
