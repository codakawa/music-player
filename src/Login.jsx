import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import SpotifyPlayer from 'spotify-web-playback';
// import { changeToken, changeTokenType } from './store/reducers/mainMusicState';



const Login = () => {
    const dispatch = useDispatch()
    // const { token, tokenType } = useSelector((state) => state.mainMusicState)

    // const AUTH_URI = "https://accounts.spotify.com/api/token"
    const CLIENT_SECRET = "9b3af0a0cd474685a51faeb754353629"
    const CLIENT_ID = "5e6ed4f2972940b597155ee74e2fff3b"
    const AUTH_URI = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${window.location.host}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`
    
    
    
    // const updTokens = () => {
    //     console.log("refresh tokens");
    //     fetch(AUTH_URI, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/x-www-form-urlencoded"
    //         },
    //         body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    //     }).then(res => res.json())
    //     .then(resp => {
    //         dispatch(changeToken(resp.access_token))
    //         dispatch(changeTokenType(resp.token_type))
    //         setTimeout(updTokens, resp.expires_in * 1000)
    //     })
    // }
    // useEffect(() => {
    //     console.log(token, tokenType);
    //     async function spot() {
    //         const spotify = new SpotifyPlayer()
    //         await spotify.connect(token)
    //         spotify.play(uri)
    //     }
    //     spot()
    // }, [tokenType])
    // useEffect(() => {
    //     updTokens()
    // }, [])

    // const uri = "spotify:track:4kRLRWnn5u9wO2wOKAAdEN"

    return (
        <div>
            <a href={AUTH_URI}>Login via Spotify</a>
        </div>
    )
}

export default Login