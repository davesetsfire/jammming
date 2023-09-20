import { useEffect} from "react";
import React from "react";



function Spotify({searchTerm, onSearch, accessToken}) {
  
  function loginToSpotify() {
      var client_id = "2dbe6fc8870d4cc1be69daaf5ab7b650";
      var redirect_uri = "http://localhost:3000";
      var url = "https://accounts.spotify.com/authorize";
      var scope = "user-modify-playback-state playlist-modify-private playlist-modify-public";
      url += "?response_type=token";
      url += "&client_id=" + encodeURIComponent(client_id);
      url += '&scope=' + encodeURIComponent(scope);
      url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
      window.location.href = url;
  }
  


  useEffect(() => {
    const term = searchTerm;
    const token = accessToken;
    if (!token) {
      console.log(term);
      return console.log("no access token");
    }
    if (term) {
    fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        term
      )}&type=track&market=DE&offset=0`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("not ok");
      })
      .then((data) => {
        onSearch(data);
        console.log(data);
      })
      .catch(
        (error) => {
          console.log(error);
        });
      }
    },[searchTerm, accessToken, onSearch]
      
  );


  return (
    <>
      <div>
      <button className="login" onClick={loginToSpotify}>
        Login
      </button>
      </div>
    </>
  );
}

export default Spotify;
