import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changePlayer, changePlayerReady, changeDeviceId, refreshAccessToken, changeNextTrackIs, changePlayerCurrentState, changePlayerIsPlaying, getPlayerQueue, changeRepeatMode, changeShuffleMode, changePlayerVolume, changePlayerCurrentPosition } from '../store/reducers/mainMusicState';

const PlayerComp = async(dispatch, token, tokenType, playerReady, refreshToken) => {
    let player = null
    // const { token, playerReady, refreshToken } = useSelector((state) => state.mainMusicState)
    // const dispatch = useDispatch()
    // useEffect(() => {
        if(token !== null) {
            try{
                console.log("CHANGE");
                const script = document.createElement("script");
                script.src = "https://sdk.scdn.co/spotify-player.js";
                script.async = true;
                document.body.appendChild(script);
                window.onSpotifyWebPlaybackSDKReady = () => {
                    try{
                        player = new Spotify.Player({
                            name: 'MAMA YA V TELEKE',
                            getOAuthToken: cb => { cb(token); },
                            volume: 0.5
                        });
                        console.log(player);
                    } catch(err) {
                        console.log(err);
                    }
            
                    // setPlayer(player)
            
                    // Ready
                    player.addListener('ready', ({ device_id }) => {
                        console.log('Ready with Device ID', device_id);
                        if(localStorage.getItem("player_volume")) player.setVolume((localStorage.getItem("player_volume") / 100))
                        dispatch(changePlayer(player))
                        dispatch(changePlayerReady(true))
                        dispatch(changeDeviceId(device_id))

                    });
                    console.log("event added");
                    player.addListener('player_state_changed', ({
                      position,
                      duration,
                      track_window,
                      track_window: {current_track},
                      paused,
                      repeat_mode,
                      shuffle,
                    }) => {
                      console.log('Currently Playing', track_window);
                      console.log('Position in Song', position);
                      console.log('Duration of Song', duration);
                      dispatch(changeNextTrackIs(track_window.next_tracks ? true : false))
                      dispatch(changePlayerCurrentState(current_track))
                      dispatch(changePlayerIsPlaying(!paused))
                      dispatch(getPlayerQueue({token: token, tokenType: tokenType}))
                      dispatch(changeRepeatMode(repeat_mode))
                      dispatch(changeShuffleMode(shuffle))
                      console.log(shuffle, "SNUFLE");
                      player.getVolume().then((volume) => {
                        dispatch(changePlayerVolume(volume * 100))
                      })
                    });
                    player.addListener("progress", ({position}) => {
                      dispatch(changePlayerCurrentPosition(position))
                    //   console.log(position);
                    })
                    // console.log(player._options.getOAuthToken)
            
                    // Not Ready
                    player.addListener('not_ready', ({ device_id }) => {
                        console.log('Device ID has gone offline', device_id);
                    });
            
                    player.addListener('initialization_error', ({ message }) => {
                        console.log(message);
                    });
            
                    player.addListener('authentication_error', ({ message }) => {
                        console.log(message);
                    });
                    
                    player.addListener('account_error', ({ message }) => {
                        console.error(message);
                    });
                    
                    player.addListener('playback_error', ({ message }) => {
                        console.error('Failed to perform playback', message);
                    });
                                            
                    player.connect();
                }
            } catch(err) {
                console.log(err);
            }
        }
    // }, [token])

}

export default PlayerComp