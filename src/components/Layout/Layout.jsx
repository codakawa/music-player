import React from 'react'
import styles from "./Layout.module.css"
import SideBar from '../SideBar/SideBar'
import Search from '../Search/Search'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { changeNextTrackIs, changePlayerCurrentPosition, changePlayerCurrentState, changePlayerIsPlaying, changePlayerVolume, changeRepeatMode, changeShuffleMode, getAccessToken, getPlayerQueue, refreshAccessToken } from '../../store/reducers/mainMusicState'
import PlayerComp from '../Player'
import MiniPlayer from '../MiniPlayer/MiniPlayer'

const Layout = ({code}) => {
  const { expiresIn, token, refreshToken, player, playerReady, tokenType } = useSelector(
    (state) => state.mainMusicState
  )
  const dispatch = useDispatch()
  useEffect(() => {
    if(playerReady) {
      player.disconnect()
      player.removeListener('ready');
      player.removeListener('player_state_changed');
      player.removeListener('progress');
      player.removeListener('not_ready');
      player.removeListener('initialization_error');
      player.removeListener('authentication_error');
      player.removeListener('account_error');
      player.removeListener('playback_error');
    }
    PlayerComp(dispatch, token, tokenType, playerReady, refreshToken)
    console.log(token);
  }, [token])
  useEffect(() => {
    dispatch(getAccessToken(code))
    console.log("dispatched");
  }, [])

  useEffect(() => {
    if(playerReady) {
      try{

      } catch(err) {
        console.dir(err);
      }
    }
  }, [playerReady, player])

  useEffect(() => {
    console.log(refreshToken);
    const refresh = () => {
      console.log("resfreshs");
      return dispatch(refreshAccessToken(refreshToken))
    }
    if(refreshToken !== null) {
      // setTimeout(refresh, 10000)
      setTimeout(refresh, (expiresIn - 60) * 1000)
    }
  }, [refreshToken])

  return (
    <section className={styles.layoutParent}>
      <div>
        <SideBar/>
        <Search/>
      </div>
      <Outlet/>
      <button onClick={() => {
        dispatch(refreshAccessToken(refreshToken))
      }}>REFRESH</button>
      <div>
        <MiniPlayer/>
      </div>
    </section>
  )
}

export default Layout