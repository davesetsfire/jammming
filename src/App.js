import "./App.css";
import Searchbar from "./Searchbar/searchbar";
import SearchResults from "./SearchResults/searchResults";
import Playlist from "./Playlist/playlist";
import { useState, useCallback } from "react";
import Spotify from "./spotify";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
  if (!accessToken) {
    if (accessTokenMatch && expiresInMatch) {
      setAccessToken(accessTokenMatch[1]);
      const expiresIn = expiresInMatch[1];

      window.setTimeout(() => {
        setAccessToken(null);
        window.history.pushState("accessToken", null, "/");
      }, expiresIn * 1000);
    }
  }

  const [term, setTerm] = useState("");
  function handleTerm(term) {
    setTerm(term);
  }

  const [results, setResults] = useState([]);
  const handleResults = useCallback((results) => {
    if (Object.keys(results).lenght !== 0) {
      setResults(results);
    }
  }, []);

  const [selectedTracks, setSelectedTracks] = useState([]);
  const addTrack = useCallback((changedTrack) => {
    setSelectedTracks((prev) => [...prev, changedTrack]);
  }, []);

  function deleteTracks(trackToRemove) {
    const playlistWithoutRemoved = selectedTracks.filter(
      (song) => song.id !== trackToRemove
    );
    setSelectedTracks(playlistWithoutRemoved);
  }

  const [userId, setUserId] = useState(null);

  async function getUserId() {
    if (userId) {
      return userId;
    } else {
      try {
        const response = await fetch(`https://api.spotify.com/v1/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserId(data.id);
          console.log(data.id);
          return data.id; // Return the user ID
        } else {
          throw new Error("Response not OK");
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }

  async function savePlaylist(playlist, urisToSend) {
      const user = await getUserId()
        .then((id) => {
          return id;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      const token = accessToken;
      const url = `https://api.spotify.com/v1/users/${user}/playlists`;
      const playlistData = {
        name: playlist,
        description: "New playlist description",
        public: false,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(playlistData),
        });

        if (response.ok) {
          const ceatedPlaylist = await response.json();
          const playlistId = ceatedPlaylist.id;
          const populateUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

          const addTracksResponse = await fetch(populateUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              uris: urisToSend,
            }),
          });
          if (addTracksResponse.ok) {
            alert("it worked, we created" + ceatedPlaylist);
          } else {
            console.log("somethin weird happened");
          }
        } else {
          alert("nophhhe");
        }
      } catch (error) {
        alert("An error occurred:", error);
      }
  }

  return (
    <div className="App">
      <Searchbar setSearchTerm={handleTerm} selectedTracks={selectedTracks} />

      <div className="playlist_with_tracks">
        <SearchResults
          result={results}
          addTrack={addTrack}
          selectedTracks={selectedTracks}
        />

        <Playlist
          getUserId={getUserId}
          selectedTracks={selectedTracks}
          callbackToRemove={deleteTracks}
          saveInSpotify={savePlaylist}
        />
        <Spotify
          searchTerm={term}
          onSearch={handleResults}
          accessToken={accessToken}
        />
      </div>
    </div>
  );
}

export default App;
