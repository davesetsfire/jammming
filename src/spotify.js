import { useEffect } from "react";
import React from "react";

let accessToken = null;
let expiresIn = null;

function Spotify({searchTerm, onSearch}) {
  
  function loginToSpotify() {
    var client_id = "2dbe6fc8870d4cc1be69daaf5ab7b650";
    var redirect_uri = "http://localhost:3000";
    var url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(client_id);
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    window.location.href = url;
  }

  function getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      expiresIn = expiresInMatch[1];

      window.setTimeout(() => {
        accessToken = null;
        window.history.pushState("accessToken", null, "/");
      }, expiresIn*1000);

      
      return accessToken;
    } else {
      return null;
    }
  }

  useEffect(() => {
    const term = searchTerm;
    const token = getAccessToken();
    if (!token) {
      console.log(term);
      return console.log("no access token");
    }

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
        //onSearch(data);
        console.log(data);
      })
      .catch(
        (error) => {
          console.log(error);
        });
      }
        ,
        [searchTerm, onSearch]
      
  );

  return (
    <>
      <button className="login" onClick={loginToSpotify}>
        Login
      </button>
    </>
  );
}

export default Spotify;
