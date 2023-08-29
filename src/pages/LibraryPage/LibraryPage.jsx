import React, { useEffect, useState } from 'react'
import styles from "./LibraryPage.module.css"
import { useDispatch, useSelector } from 'react-redux'
import SpotifyPlayer from 'spotify-web-playback'
import Player from '../../components/Player'
import SideBar from '../../components/SideBar/SideBar'
import Search from '../../components/Search/Search'
// import Auth from '../../components/Auth'
import { getAccessToken, refreshAccessToken } from '../../store/reducers/mainMusicState'

const LibraryPage = ({player}) => {
  console.log(player);
  // const dispatch = useDispatch()
  // const { expiresIn, token, refreshToken } = useSelector(
  //   (state) => state.mainMusicState
  // )
  // useEffect(() => {
  //   dispatch(getAccessToken(code))
  // }, [])

  // useEffect(() => {
  //   console.log(refreshToken);
  //   const refresh = () => {
  //     console.log("resfreshs");
  //     return dispatch(refreshAccessToken(refreshToken))
  //   }
  //   if(refreshToken !== null) {
  //     setTimeout(refresh, (expiresIn - 60) * 1000)
  //   }
  // }, [refreshToken])

  // const uri = "spotify:track:4kRLRWnn5u9wO2wOKAAdEN"

  // useEffect(() => {
  //   if(token !== null) {
  //     const spotify = new SpotifyPlayer()
  //     spotify.connect(token)
  //     spotify.play(uri)  
  //   }
  // }, [token])


  return (
    <section className={styles.libraryPageParent}>
        {/* <SideBar/>
        <Search/> */}
        {/* <Player/> */}
    </section>
  )
}

export default LibraryPage