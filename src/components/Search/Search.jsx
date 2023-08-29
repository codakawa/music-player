import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTrackAtQueue, artistsTopTrackSearchRequest, changeLocalQueue, playSongRequest } from '../../store/reducers/mainMusicState'
import { searchRequest } from '../../store/reducers/searchState'
import styles from "./Search.module.css"


const Search = () => {
    const dispatch = useDispatch()
    const { token, tokenType, playerCurrentState, playerReady, player, localQueue, deviceId, playerIsPlaying } = useSelector((state) => state.mainMusicState)
    const { searchLoader, searchError, trackSearchResult, albumSearchResult, playlistSearchResult, artistSearchResult } = useSelector((state) => state.searchState)
    const [opened, setOpened] = useState(false)
    const [openedInput, setOpenedInput] = useState(false)
    const [emptyInput, setEmptyInput] = useState(true)
    const [inputValue, setInputValue] = useState("")
    useEffect(() => {
        if(!opened) setOpenedInput(false)
    }, [ openedInput ])
    useEffect(() => {
        if(inputValue === '') return
        const searchF = () => {
            dispatch(searchRequest({
                search_q: inputValue,
                type: "album%2Cartist%2Cplaylist%2Ctrack",
                limit: 10,
                offset: 0,
                token: token,
                tokenType: tokenType
            }))
        }
        // window.clearTimeout(timeout)
        searchF()
        
    }, [ inputValue ])

    useEffect(() => {
        console.log(artistSearchResult);
        console.log(trackSearchResult);
        console.log(albumSearchResult);
        console.log(playlistSearchResult);
    }, [artistSearchResult, trackSearchResult, albumSearchResult, playlistSearchResult])


    // useEffect(() => {
    //     if(topTrackData !== null && topTrackData !== undefined) dispatch(changeSearchLoader(false))
    //     console.log(topTrackData);
    // }, [ topTrackData ])


    // useEffect(() => {
    //     console.log(searchArtistData);
    //     if(searchArtistData !== null) {
    //         if(searchArtistData?.artists.items.length !== 0) {
    //             setNotFound(false)
    //             dispatch(artistsTopTrackSearchRequest({
    //                 id: searchArtistData?.artists.items[0].id,
    //                 token: token,
    //                 tokenType: tokenType
    //             }))
    //             .then(res => setTopTrackData(res.payload.tracks))
    //             .finally(() => {
    //             })
    //         } else setNotFound(true)
    //     } 
    // }, [ searchArtistData ])
    


    // if(searchLoader) return <h1>LOADING</h1>
    return (
        <div className={styles.searchParent}>
            <div className={opened ? `${styles.searchBarParentOpened} ${styles.searchBarParent}` : styles.searchBarParent} onMouseEnter={() => {
                setOpened(true)
                setTimeout(() => {
                    setOpenedInput(true)
                }, 150)
            }} onMouseLeave={() => {
                if(!emptyInput) return
                setOpened(false)
                setOpenedInput(false)
            }}>
                <label forhtml="input">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path d="M16.1129 24.4711C17.9096 24.4711 19.5933 23.9287 20.9946 23.0021L25.9441 27.9629C26.2718 28.2793 26.6899 28.4375 27.1419 28.4375C28.0798 28.4375 28.7691 27.703 28.7691 26.7764C28.7691 26.347 28.6222 25.9289 28.3058 25.6124L23.3902 20.6742C24.4072 19.2278 25.0062 17.4763 25.0062 15.5778C25.0062 10.6848 21.0059 6.68457 16.1129 6.68457C11.2312 6.68457 7.2196 10.6848 7.2196 15.5778C7.2196 20.4708 11.2199 24.4711 16.1129 24.4711ZM16.1129 22.0981C12.5307 22.0981 9.59265 19.16 9.59265 15.5778C9.59265 11.9957 12.5307 9.05762 16.1129 9.05762C19.6951 9.05762 22.6331 11.9957 22.6331 15.5778C22.6331 19.16 19.6951 22.0981 16.1129 22.0981Z" fill="white" fill-opacity="0.96"/>
                    </svg>
                </label>
                <input placeholder='Search' id='input' value={inputValue} type="text" className={openedInput ? styles.searchBar : styles.d_none} onChange={(e) => {
                    setInputValue(e.target.value)
                    if(e.target.value === '') setEmptyInput(true)  
                    else setEmptyInput(false)  
                }}/>
                <button className={openedInput ? (emptyInput ? styles.d_none : styles.eraseBtn) : styles.d_none} onClick={() => {
                    setInputValue("")
                    setEmptyInput(true)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path d="M10.6886 23.0585C10.214 23.5331 10.1914 24.3806 10.6999 24.8666C11.1858 25.3751 12.0446 25.3525 12.5192 24.8779L17.9998 19.3973L23.4804 24.8779C23.9664 25.3638 24.8026 25.3751 25.2885 24.8666C25.797 24.3806 25.7857 23.5331 25.2998 23.0472L19.8192 17.5666L25.2998 12.0973C25.7857 11.6001 25.797 10.7639 25.2885 10.278C24.8026 9.76946 23.9664 9.78076 23.4804 10.2667L17.9998 15.7473L12.5192 10.2667C12.0446 9.79206 11.1858 9.76946 10.6999 10.278C10.1914 10.7639 10.214 11.6114 10.6886 12.086L16.1692 17.5666L10.6886 23.0585Z" fill="white" fill-opacity="0.96"/>
                    </svg>
                </button>
            </div>
            {artistSearchResult?.items.length <= 0 || searchLoader || searchError ? 
                <div className={emptyInput ? `${styles.h0} ${styles.popUpLoad}` : `${styles.popUpSearch} ${styles.popUpLoad}`}>{searchLoader ? <i className="gg-spinner-alt"></i> : "Not found (" }</div>
            :
            <div className={emptyInput ? styles.h0 : styles.popUpSearch}>
                <div className={styles.popUpSearchArtist}>
                    <div className={styles.artistImg}>
                        {artistSearchResult?.items[0].images.length <= 0 ? 
                            <svg role="img" height="48" width="48" aria-hidden="true" data-testid="user" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 haNxPq">
                                <path d="M10.165 11.101a2.5 2.5 0 0 1-.67 3.766L5.5 17.173A2.998 2.998 0 0 0 4 19.771v.232h16.001v-.232a3 3 0 0 0-1.5-2.598l-3.995-2.306a2.5 2.5 0 0 1-.67-3.766l.521-.626.002-.002c.8-.955 1.303-1.987 1.375-3.19.041-.706-.088-1.433-.187-1.727a3.717 3.717 0 0 0-.768-1.334 3.767 3.767 0 0 0-5.557 0c-.34.37-.593.82-.768 1.334-.1.294-.228 1.021-.187 1.727.072 1.203.575 2.235 1.375 3.19l.002.002.521.626zm5.727.657-.52.624a.5.5 0 0 0 .134.753l3.995 2.306a5 5 0 0 1 2.5 4.33v2.232H2V19.77a5 5 0 0 1 2.5-4.33l3.995-2.306a.5.5 0 0 0 .134-.753l-.518-.622-.002-.002c-1-1.192-1.735-2.62-1.838-4.356-.056-.947.101-1.935.29-2.49A5.713 5.713 0 0 1 7.748 2.87a5.768 5.768 0 0 1 8.505 0 5.713 5.713 0 0 1 1.187 2.043c.189.554.346 1.542.29 2.489-.103 1.736-.838 3.163-1.837 4.355m-.001.001z"></path>
                            </svg>
                        :
                            <img src={artistSearchResult?.items[0].images[0]?.url} alt="artIMG404" className={styles.loadImage} onLoad={(e) => {
                                e.target.style.visibility = "visible"
                            }}/>
                        }
                    </div>
                    {/* {searchLoader ? } */}
                    <div className={styles.artistInfo}>
                        <h4>{artistSearchResult?.items[0]?.name}</h4>
                        <div>
                            <a href="" className={styles.artistProfileBtn} onClick={(e) => {
                                e.preventDefault()
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">
                                    <path d="M24.4846 38.9866C33.0276 38.9866 40.0789 31.9353 40.0789 23.4074C40.0789 14.8795 33.0125 7.82812 24.4696 7.82812C15.9417 7.82812 8.9054 14.8795 8.9054 23.4074C8.9054 31.9353 15.9567 38.9866 24.4846 38.9866ZM24.4696 25.8633C21.5164 25.8482 19.2263 23.3772 19.2263 20.1077C19.1961 17.034 21.5315 14.4727 24.4696 14.4727C27.4076 14.4727 29.7129 17.034 29.7129 20.1077C29.7129 23.3772 27.4227 25.8934 24.4696 25.8633ZM24.4696 36.4102C21.0946 36.4102 17.5086 35.0089 15.2335 32.5681C16.9662 29.9766 20.4015 28.4699 24.4696 28.4699C28.4924 28.4699 31.9578 29.9464 33.7056 32.5681C31.4305 35.0089 27.8446 36.4102 24.4696 36.4102Z" fill="white" fill-opacity="0.96"/>
                                </svg>
                            </a>
                            <a href="#" className={styles.artistPlayAllBtn} onClick={(e) => {
                                e.preventDefault()
                                dispatch(playSongRequest({
                                    reqType: "artist",
                                    deviceId: deviceId,
                                    token: token,
                                    tokenType: tokenType,
                                    uris: artistSearchResult?.items[0].uri
                                }))
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" viewBox="0 0 49 48" fill="none">
                                    <path d="M16.5142 36.636C17.147 36.636 17.7045 36.4099 18.3975 36.0031L36.1916 25.7124C37.4874 24.9591 38.0298 24.3714 38.0298 23.4222C38.0298 22.473 37.4874 21.9005 36.1916 21.132L18.3975 10.8413C17.7045 10.4345 17.147 10.2085 16.5142 10.2085C15.2787 10.2085 14.4048 11.1577 14.4048 12.6493V34.1951C14.4048 35.7018 15.2787 36.636 16.5142 36.636Z" fill="white" fill-opacity="0.96"/>
                                </svg>
                                <span>Play all</span>
                            </a>
                        </div>                
                    </div>
                </div>
                <div className={styles.popUpSearchResults}>
                    {trackSearchResult?.items.map(track => 
                        <div key={track?.id} className={track?.id === playerCurrentState?.id ? styles.currentPlaying : ""} onClick={(e) => {
                            if(track?.id === playerCurrentState?.id) if(playerReady) player.togglePlay()
                        }} title={track?.name}>
                            <div onClick={(e) => {
                                console.log("clocked");
                                if(track?.id !== playerCurrentState?.id) {
                                    dispatch(playSongRequest({
                                        reqType: "autoQueue",
                                        deviceId: deviceId,
                                        token: token,
                                        tokenType: tokenType,
                                        seedArtist: track.artists[0].id,
                                        seedTrack: track.id,
                                        uris: [track?.uri],
                                        firstTrack: track?.uri
                                    }))
                                }
                            }}>
                                {playerIsPlaying && track?.id === playerCurrentState?.id ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                        <path d="M12.3837 26.9574H15.0393C16.1128 26.9574 16.6665 26.4037 16.6665 25.3301V9.78104C16.6665 8.68492 16.1128 8.16511 15.0393 8.15381H12.3837C11.3102 8.15381 10.7565 8.70752 10.7565 9.78104V25.3301C10.7452 26.4037 11.2989 26.9574 12.3837 26.9574ZM20.9719 26.9574H23.6162C24.6897 26.9574 25.2434 26.4037 25.2434 25.3301V9.78104C25.2434 8.68492 24.6897 8.15381 23.6162 8.15381H20.9719C19.8871 8.15381 19.3447 8.70752 19.3447 9.78104V25.3301C19.3447 26.4037 19.8871 26.9574 20.9719 26.9574Z" fill="white" fill-opacity="0.96"/>
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                        <path d="M12.0109 27.4773C12.4855 27.4773 12.9036 27.3078 13.4234 27.0027L26.769 19.2847C27.7408 18.7197 28.1476 18.2789 28.1476 17.567C28.1476 16.8551 27.7408 16.4257 26.769 15.8494L13.4234 8.13135C12.9036 7.82624 12.4855 7.65674 12.0109 7.65674C11.0843 7.65674 10.4288 8.36865 10.4288 9.48737V25.6467C10.4288 26.7767 11.0843 27.4773 12.0109 27.4773Z" fill="white" fill-opacity="0.96"/>
                                    </svg>
                                }
                                <img src={track?.album.images[0].url} alt="" />
                            </div>
                            <div>
                                <h4>{track?.name.length > 45 ? (track?.name.slice(0, 43)+" ...") : (track?.name)}</h4>
                                <h5>{track?.artists[0].name}</h5>
                            </div>
                            <div>
                                <div onClick={() => {
                                    dispatch(addTrackAtQueue({
                                        token: token,
                                        tokenType: tokenType,
                                        uri: track.uri,
                                        deviceId: deviceId
                                    }))
                                }} title="Add to Queue">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                                        <path d="M6.5979 11.6149L8.51643 10.4899C8.90817 10.2488 8.89812 9.66626 8.51643 9.44527L6.5979 8.2801C6.11576 7.99885 5.61353 8.16961 5.61353 8.73211V11.183C5.61353 11.7254 6.11576 11.8962 6.5979 11.6149ZM12.464 10.9017H25.4015C25.9439 10.9017 26.3758 10.4799 26.3758 9.93746C26.3758 9.39505 25.9539 8.97318 25.4015 8.97318H12.464C11.9316 8.97318 11.4997 9.39505 11.4997 9.93746C11.4997 10.4799 11.9216 10.9017 12.464 10.9017ZM6.5979 17.7823L8.51643 16.6473C8.90817 16.4163 8.89812 15.8337 8.51643 15.6026L6.5979 14.4475C6.11576 14.1562 5.61353 14.327 5.61353 14.8895V17.3404C5.61353 17.8828 6.11576 18.0535 6.5979 17.7823ZM12.464 17.0792H25.4015C25.9439 17.0792 26.3758 16.6573 26.3758 16.1149C26.3758 15.5725 25.9539 15.1506 25.4015 15.1506H12.464C11.9316 15.1506 11.4997 15.5725 11.4997 16.1149C11.4997 16.6573 11.9216 17.0792 12.464 17.0792ZM6.5979 23.9698L8.51643 22.8448C8.90817 22.6038 8.89812 22.0212 8.51643 21.8002L6.5979 20.635C6.11576 20.3538 5.61353 20.5245 5.61353 21.087V23.5279C5.61353 24.0803 6.11576 24.2511 6.5979 23.9698ZM12.464 23.2567H25.4015C25.9439 23.2567 26.3758 22.8348 26.3758 22.2924C26.3758 21.75 25.9539 21.3281 25.4015 21.3281H12.464C11.9316 21.3281 11.4997 21.75 11.4997 22.2924C11.4997 22.8348 11.9216 23.2567 12.464 23.2567Z" fill="white" fill-opacity="0.96"/>
                                    </svg>
                                </div>
                                <div title='not work yet'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                                        <path d="M8.72761 17.25H14.8548V23.3772C14.8548 24 15.3671 24.5223 15.9999 24.5223C16.6327 24.5223 17.145 24 17.145 23.3772V17.25H23.2723C23.895 17.25 24.4173 16.7377 24.4173 16.1049C24.4173 15.4721 23.895 14.9598 23.2723 14.9598H17.145V8.83259C17.145 8.20982 16.6327 7.6875 15.9999 7.6875C15.3671 7.6875 14.8548 8.20982 14.8548 8.83259V14.9598H8.72761C8.10484 14.9598 7.58252 15.4721 7.58252 16.1049C7.58252 16.7377 8.10484 17.25 8.72761 17.25Z" fill="white" fill-opacity="0.96"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>}
        </div>
    )
}

export default Search