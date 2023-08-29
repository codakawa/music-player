import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePlayerVolume } from '../../store/reducers/mainMusicState'
import Queue from '../Queue/Queue'
import styles from "./MiniPlayer.module.css"

export const fixSongDuration = (num) => {
    const seconds = Math.floor(((num / 1000) % 60))
    const minutes = Math.floor(((num / 1000) / 60))
    if(num === undefined) return "0:00"
    else if(seconds < 10) return `${minutes}:0${seconds}`
    else return `${minutes}:${seconds}`
}
const MiniPlayer = () => {
    const { playerCurrentState, player, playerIsPlaying, playerCurrentPosition, playerVolume } = useSelector((state) => state.mainMusicState)
    const [miniPlayerIsHidden, setMiniPlayerIsHidden] = useState(true)
    const [miniPlayerIsMouseEnter, setMiniPlayerIsMouseEnter] = useState(true)
    const [playerIsNull, setPlayerIsNull] = useState(true)
    const [fixedPlayerCurrentPosition, setFixedPlayerCurrentPosition] = useState("")
    const [fixedPlayerSongDuration, setFixedPlayerSongDuration] = useState(0)
    const [localVolume, setLocalVolume] = useState(0)
    const [showQueue, setShowQueue] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if(playerCurrentState !== null) setPlayerIsNull(false)
        setFixedPlayerSongDuration(fixSongDuration(playerCurrentState?.duration_ms))
    }, [ playerCurrentState ])

    useEffect(() => {
        setLocalVolume(playerVolume)
    }, [playerVolume])
    
    useEffect(() => {
        setFixedPlayerCurrentPosition(fixSongDuration(playerCurrentPosition))
    }, [playerCurrentPosition])
    

    const seekToPosition = (direction, seconds) => {
        let newPos;
        if(direction === "forward") newPos = playerCurrentPosition + (seconds * 1000)
        else if(direction === "backward") newPos = playerCurrentPosition - (seconds * 1000)
        else newPos = seconds * 1000
        
        player.seek(newPos).then(() => {
            console.log(`seeked ${seconds} seconds to ${direction}`);
        })
    }

    const setNewVolume = (volume) => {
        try{
            player.setVolume((volume < 0 ? 0 : volume) / 100).then(() => {
                setLocalVolume(volume)
                localStorage.setItem("player_volume", volume)
                console.log("NEW VOLUME ", volume, "%");
                // player.getVolume().then((volume) => {
                //     dispatch(changePlayerVolume(volume))
                // })
            })
        } catch(err) {
            console.error(err);
        }
    }

    const getVolumeWidth = () => {
        if(localVolume <= 10) return {width: "50px"}
        else if(localVolume <= 35 && localVolume > 10) return {width: "67px"}
        else if(localVolume <= 75 && localVolume > 35) return {width: "80px"}
        else if(localVolume <= 100 && localVolume > 75) return {width: "100px"}
    }


  return (
    <div className={playerCurrentState === null ? styles.d_none : styles.parent} style={miniPlayerIsHidden ? (showQueue ? {transform: 'translateX(290px) translateY(0px)', gap: "20px"} : {transform: 'translateX(290px) translateY(calc(100vh - 400px))', gap: "0"}) : (showQueue ? {transform: 'translateX(-25px) translateY(0px)', gap: "20px"} : {transform: 'translateX(-25px) translateY(calc(100vh - 400px))', gap: "0"})}>
        <div className={styles.miniPlayerAll}>
            <div className={miniPlayerIsHidden ? styles.hiddenPlayer : `${styles.hiddenPlayer} ${styles.d_none}`} onClick={() => {
                setMiniPlayerIsHidden(!miniPlayerIsHidden)
            }} style={playerIsNull ? {} : {backgroundImage: `url(${playerCurrentState?.album.images[0].url})`}}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
                    <path d="M14.3119 23.9074C14.3119 24.4347 14.5077 24.8867 14.9296 25.2785L26.6517 36.7595C26.9832 37.091 27.4051 37.2718 27.9023 37.2718C28.8967 37.2718 29.6952 36.4883 29.6952 35.4788C29.6952 34.9816 29.4843 34.5446 29.1528 34.1981L18.5909 23.9074L29.1528 13.6166C29.4843 13.2701 29.6952 12.8181 29.6952 12.3359C29.6952 11.3265 28.8967 10.543 27.9023 10.543C27.4051 10.543 26.9832 10.7238 26.6517 11.0552L14.9296 22.5212C14.5077 22.928 14.3119 23.38 14.3119 23.9074Z" fill="white" fill-opacity="0.96"/>
                    </svg>
                </div>
            {/* </div>
            <div className={styles.playerArrow}> */}
            </div>
            <div className={!miniPlayerIsHidden ? (miniPlayerIsMouseEnter || showQueue ? styles.miniPlayerParentBig : styles.miniPlayerParent) : styles.miniPlayerParentHidden} onMouseEnter={() => {
                setMiniPlayerIsMouseEnter(true)
            }} onMouseLeave={() => {
                setMiniPlayerIsMouseEnter(false)
            }} style={miniPlayerIsMouseEnter || showQueue ? {flexDirection: "row"} : {flexDirection: "column"}}>
                <button className={miniPlayerIsMouseEnter || showQueue ? styles.fullscreen : styles.d_none}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path d="M8.36089 16.143C9.07281 16.143 9.60392 15.6232 9.60392 14.9V14.0977L9.36661 10.5946L11.977 13.3405L15.2088 16.595C15.4461 16.8436 15.7512 16.9566 16.0789 16.9566C16.8474 16.9566 17.4011 16.4368 17.4011 15.6684C17.4011 15.3181 17.2655 15.013 17.0282 14.7644L13.785 11.5212L11.0277 8.92215L14.5534 9.15946H15.4348C16.1467 9.15946 16.6892 8.63965 16.6892 7.91643C16.6892 7.19322 16.158 6.66211 15.4348 6.66211H9.16321C7.86368 6.66211 7.10657 7.41922 7.10657 8.71875V14.9C7.10657 15.6119 7.63768 16.143 8.36089 16.143ZM20.5538 28.4602H26.8255C28.125 28.4602 28.8821 27.7031 28.8821 26.4036V20.2224C28.8821 19.5105 28.3397 18.9794 27.6278 18.9794C26.9159 18.9794 26.3847 19.4992 26.3847 20.2224V21.0247L26.6221 24.5278L24.0117 21.7818L20.7798 18.5273C20.5425 18.2787 20.2374 18.1657 19.8984 18.1657C19.13 18.1657 18.5763 18.6855 18.5763 19.454C18.5763 19.8043 18.7119 20.1207 18.9605 20.358L22.2037 23.6011L24.9609 26.2002L21.4353 25.9629H20.5538C19.8306 25.9629 19.2995 26.4827 19.2995 27.2059C19.2995 27.9291 19.8306 28.4602 20.5538 28.4602Z" fill="white" fill-opacity="0.96"/>
                    </svg>
                </button>
                <button className={miniPlayerIsMouseEnter || showQueue ? styles.hidePlayer : styles.d_none} onClick={() => {
                    setMiniPlayerIsHidden(true)
                    setShowQueue(false)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path d="M6 17.6673C6 18.4131 6.51981 18.9216 7.27693 18.9216H17.7183L20.0914 18.8086L16.8256 21.7806L14.5543 24.0858C14.317 24.3231 14.1701 24.6282 14.1701 24.9898C14.1701 25.6904 14.6899 26.1989 15.4018 26.1989C15.7408 26.1989 16.0459 26.0633 16.3284 25.7921L23.4362 18.6052C23.6283 18.4131 23.764 18.1871 23.8205 17.9272V25.1254C23.8205 25.826 24.3516 26.3345 25.0522 26.3345C25.7641 26.3345 26.2952 25.826 26.2952 25.1254V10.2204C26.2952 9.51981 25.7641 9 25.0522 9C24.3516 9 23.8205 9.51981 23.8205 10.2204V17.3961C23.764 17.1475 23.6283 16.9215 23.4362 16.7294L16.3284 9.53111C16.0459 9.25991 15.7408 9.1243 15.4018 9.1243C14.6899 9.1243 14.1701 9.64411 14.1701 10.3334C14.1701 10.695 14.317 11.0114 14.5543 11.2374L16.8256 13.554L20.0914 16.5146L17.7183 16.4016H7.27693C6.51981 16.4016 6 16.9215 6 17.6673Z" fill="white" fill-opacity="0.96"/>
                    </svg>
                </button>
                <div className={styles.image} style={miniPlayerIsMouseEnter || showQueue ? {width: "300px", height: "300px"} : {width: "250px", height: "250px"}}>
                    <img src={playerCurrentState?.album.images[0].url} alt="" style={miniPlayerIsMouseEnter || showQueue ? {width: "300px", height: "300px"} : {width: "250px", height: "250px"}}/>
                    <div className={styles.volume} style={localVolume >= 35 ? {height: `${localVolume}%`} : {height: "34%"}}>
                        <div style={getVolumeWidth()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
                                <path d="M82.0201 77.8028C83.346 78.6767 85.1239 78.2849 86.0882 76.8385C91.3917 68.8831 94.5859 58.9992 94.5859 48.151C94.5859 37.2726 91.3315 27.4188 86.0882 19.4333C85.1239 17.9568 83.346 17.5952 82.0201 18.4691C80.5737 19.4032 80.3627 21.1811 81.3571 22.7782C85.9676 29.7994 88.8304 38.5081 88.8304 48.151C88.8304 57.7336 85.9676 66.5025 81.3571 73.4936C80.3627 75.0907 80.5737 76.8686 82.0201 77.8028ZM43.0268 75.151C45.2868 75.151 46.9442 73.4635 46.9442 71.2336V25.2191C46.9442 22.959 45.2868 21.151 42.9665 21.151C41.4297 21.151 40.3147 21.7838 38.6875 23.3809L26.0915 35.1633C25.9107 35.3441 25.6696 35.4345 25.3984 35.4345H16.8705C12.4107 35.4345 10 37.9054 10 42.5762V53.786C10 58.4568 12.4107 60.9278 16.8705 60.9278H25.3984C25.6696 60.9278 25.8806 61.0182 26.0915 61.199L38.6875 73.0717C40.1942 74.5182 41.4598 75.151 43.0268 75.151ZM69.8158 69.6365C71.202 70.4802 72.8895 70.1789 73.8538 68.7626C77.7712 63.2179 80.0614 55.7749 80.0614 48.1208C80.0614 40.4668 77.8013 32.9936 73.8538 27.4791C72.8895 26.0628 71.202 25.7313 69.8158 26.6052C68.3694 27.5092 68.1585 29.3173 69.2433 30.9144C72.4375 35.6153 74.2757 41.7325 74.2757 48.1208C74.2757 54.4791 72.4074 60.5963 69.2433 65.3273C68.1886 66.9244 68.3694 68.7023 69.8158 69.6365ZM57.6719 61.5606C58.9676 62.4043 60.6551 62.103 61.5893 60.7771C64.0301 57.5226 65.4766 52.9121 65.4766 48.1208C65.4766 43.3296 64.0301 38.7492 61.5893 35.4646C60.6551 34.1387 58.9676 33.8374 57.6719 34.7112C56.1953 35.6755 55.9241 37.4534 57.0993 39.2012C58.7567 41.5818 59.6908 44.776 59.6908 48.1208C59.6908 51.4657 58.7567 54.6298 57.0993 57.0405C55.9241 58.7883 56.1953 60.5662 57.6719 61.5606Z" fill="white" fill-opacity="0.96"/>
                            </svg>
                        </div>
                    </div>
                    <input type="range" name="" id="" min={0} max={100} defaultValue={playerVolume ? playerVolume : 0} onChange={(e) => {
                        setNewVolume(e.target.value)
                    }}/>
                </div>
                <div className={styles.playerPanelParent}>
                    <div className={styles.playerName} style={miniPlayerIsMouseEnter || showQueue ? {paddingTop: "20px"} : {}}>
                        <div>
                            <h4 style={miniPlayerIsMouseEnter || showQueue ? {width: "270px"} : {}}>{miniPlayerIsMouseEnter || showQueue ? (playerCurrentState?.name.length <= 60 ? playerCurrentState?.name : playerCurrentState?.name.slice(0, 60)+"...") : (playerCurrentState?.name.length <= 17 ? playerCurrentState?.name : playerCurrentState?.name.slice(0, 17))}</h4>
                            <h5>{playerCurrentState?.artists[0].name}</h5>
                        </div>
                    </div>
                    <div className={miniPlayerIsMouseEnter || showQueue ? styles.playerPanel : styles.d_none}>
                        <div>
                            <button onClick={() => {
                                seekToPosition("backward", 15)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                                    <path d="M18.4886 29.7513C24.8959 29.7513 30.1844 24.4628 30.1844 18.0556C30.1844 12.4507 26.1276 7.7046 20.8278 6.60848V4.94734C20.8278 4.08853 20.1837 3.83992 19.483 4.34843L15.6636 7.04919C15.0873 7.46729 15.0873 8.10011 15.6636 8.50692L19.4717 11.219C20.1724 11.7275 20.8278 11.5015 20.8278 10.6201V8.99282C24.8733 10.0211 27.8339 13.6711 27.8339 18.0556C27.8339 23.2424 23.6754 27.4122 18.4886 27.4122C13.3018 27.4122 9.13205 23.2424 9.14335 18.0556C9.15465 15.0384 10.5672 12.4055 12.782 10.6992C13.3131 10.2358 13.4826 9.56914 13.0758 9.01543C12.7029 8.48431 11.9684 8.39391 11.3582 8.89112C8.61223 10.9478 6.8042 14.4056 6.8042 18.0556C6.8042 24.4628 12.0927 29.7513 18.4886 29.7513ZM15.2568 22.7904C15.7653 22.7904 16.0817 22.4514 16.0817 21.909V14.9028C16.0817 14.2248 15.7201 13.8745 15.1212 13.8745C14.7596 13.8745 14.4884 13.9875 14.0476 14.3152L12.5899 15.3548C12.2848 15.6035 12.1492 15.8295 12.1492 16.1346C12.1492 16.5414 12.4769 16.8804 12.8724 16.8804C13.1323 16.8804 13.2792 16.8126 13.4939 16.6092L14.4432 15.8408V21.909C14.4432 22.4401 14.7596 22.7904 15.2568 22.7904ZM20.9295 22.9034C22.8279 22.9034 24.0709 21.683 24.0709 19.8071C24.0709 18.1234 22.9409 16.9708 21.3928 16.9708C20.7035 16.9708 19.9803 17.2985 19.6639 17.8296L19.8447 15.4566H23.0878C23.4946 15.4566 23.7997 15.1401 23.7997 14.7107C23.7997 14.2813 23.4946 13.9988 23.0878 13.9988H19.4943C18.8728 13.9988 18.5225 14.3717 18.4773 15.0271L18.2513 18.2477C18.1948 18.8579 18.5338 19.163 19.0649 19.163C19.483 19.163 19.6413 19.0839 19.9464 18.8466C20.3419 18.4963 20.6696 18.3381 21.1103 18.3381C21.9465 18.3381 22.4889 18.9483 22.4889 19.841C22.4889 20.7677 21.8448 21.4457 20.986 21.4457C20.3419 21.4457 19.8221 21.0841 19.5283 20.5417C19.3587 20.2704 19.1553 20.1122 18.8389 20.1122C18.4208 20.1122 18.127 20.406 18.127 20.8355C18.127 21.005 18.1609 21.1632 18.2287 21.3327C18.5338 22.1124 19.5396 22.9034 20.9295 22.9034Z" fill="white" fill-opacity="0.96"/>
                                </svg>
                            </button>
                            <button onClick={() => {
                                player.previousTrack()
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                    <g clip-path="url(#clip0_260_1436)">
                                        <path d="M12.083 21.6592C12.8564 21.6592 13.5068 21.0703 13.5068 19.998V14.9355C13.6211 15.3574 13.9375 15.7178 14.4648 16.0254L23.4736 21.3164C23.8516 21.5449 24.1855 21.6592 24.5723 21.6592C25.3457 21.6592 25.9961 21.0703 25.9961 19.998V9.16113C25.9961 8.08887 25.3457 7.5 24.5723 7.5C24.1855 7.5 23.8516 7.61426 23.4736 7.84277L14.4648 13.1338C13.9375 13.4414 13.6211 13.793 13.5068 14.2148V9.16113C13.5068 8.08887 12.8652 7.5 12.0918 7.5C11.6963 7.5 11.3711 7.61426 10.9844 7.84277L1.97559 13.1338C1.30762 13.5293 0.982422 13.9775 0.982422 14.5752C0.982422 15.1641 1.31641 15.6387 1.97559 16.0254L10.9844 21.3164C11.3623 21.5449 11.6963 21.6592 12.083 21.6592Z" fill="white" fill-opacity="0.96"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_260_1436">
                                        <rect width="28" height="28" fill="white" transform="translate(0.5 0.5)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <button onClick={() => {
                                player.togglePlay()
                            }}>
                                {playerIsPlaying ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                        <path d="M16.5117 35.943H20.0524C21.4838 35.943 22.222 35.2047 22.222 33.7734V13.0412C22.222 11.5797 21.4838 10.8866 20.0524 10.8716H16.5117C15.0803 10.8716 14.342 11.6099 14.342 13.0412V33.7734C14.327 35.2047 15.0652 35.943 16.5117 35.943ZM27.9626 35.943H31.4882C32.9196 35.943 33.6579 35.2047 33.6579 33.7734V13.0412C33.6579 11.5797 32.9196 10.8716 31.4882 10.8716H27.9626C26.5161 10.8716 25.7929 11.6099 25.7929 13.0412V33.7734C25.7929 35.2047 26.5161 35.943 27.9626 35.943Z" fill="white" fill-opacity="0.96"/>
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 49 49" fill="none">
                                        <path d="M16.5145 37.136C17.1473 37.136 17.7048 36.9099 18.3979 36.5031L36.192 26.2124C37.4877 25.4591 38.0302 24.8714 38.0302 23.9222C38.0302 22.973 37.4877 22.4005 36.192 21.632L18.3979 11.3413C17.7048 10.9345 17.1473 10.7085 16.5145 10.7085C15.279 10.7085 14.4052 11.6577 14.4052 13.1493V34.6951C14.4052 36.2018 15.279 37.136 16.5145 37.136Z" fill="white" fill-opacity="0.96"/>
                                    </svg>
                                }
                            </button>
                            <button onClick={() => {
                                player.nextTrack()
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                    <g clip-path="url(#clip0_260_1444)">
                                        <path d="M17.3994 21.6592C16.626 21.6592 15.9756 21.0703 15.9756 19.998V14.9355C15.8613 15.3574 15.5449 15.7178 15.0176 16.0254L6.00879 21.3164C5.63086 21.5449 5.29688 21.6592 4.91016 21.6592C4.13672 21.6592 3.48633 21.0703 3.48633 19.998V9.16113C3.48633 8.08887 4.13672 7.5 4.91016 7.5C5.29688 7.5 5.63086 7.61426 6.00879 7.84277L15.0176 13.1338C15.5449 13.4414 15.8613 13.793 15.9756 14.2148V9.16113C15.9756 8.08887 16.6172 7.5 17.3906 7.5C17.7861 7.5 18.1113 7.61426 18.498 7.84277L27.5068 13.1338C28.1748 13.5293 28.5 13.9775 28.5 14.5752C28.5 15.1641 28.166 15.6387 27.5068 16.0254L18.498 21.3164C18.1201 21.5449 17.7861 21.6592 17.3994 21.6592Z" fill="white" fill-opacity="0.96"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_260_1444">
                                        <rect width="28" height="28" fill="white" transform="translate(0.5 0.5)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <button onClick={() => {
                                seekToPosition("forward", 15)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                                    <path d="M18.4888 29.7513C24.896 29.7513 30.1845 24.4628 30.1845 18.0556C30.1845 14.4056 28.3651 10.9477 25.6305 8.89109C25.0203 8.39388 24.2745 8.48428 23.9016 9.01539C23.4948 9.5691 23.6756 10.2358 24.1954 10.6991C26.4215 12.4055 27.834 15.0384 27.8453 18.0556C27.8566 23.2424 23.6756 27.4121 18.4888 27.4121C13.3019 27.4121 9.15477 23.2424 9.15477 18.0556C9.15477 13.6711 12.1154 10.0211 16.1609 8.99279V10.6313C16.1609 11.5014 16.805 11.7387 17.5056 11.2302L21.3251 8.52948C21.8901 8.11137 21.9014 7.47856 21.3251 7.07175L17.5169 4.3597C16.805 3.85119 16.1609 4.07719 16.1609 4.95861V6.60844C10.8498 7.70456 6.80432 12.4507 6.80432 18.0556C6.80432 24.4628 12.0928 29.7513 18.4888 29.7513ZM15.2569 22.7904C15.7654 22.7904 16.0818 22.4514 16.0818 21.9089V14.9028C16.0818 14.2248 15.7202 13.8745 15.1213 13.8745C14.7597 13.8745 14.4885 13.9875 14.0478 14.3152L12.59 15.3548C12.2849 15.6034 12.1493 15.8294 12.1493 16.1345C12.1493 16.5413 12.477 16.8803 12.8725 16.8803C13.1324 16.8803 13.2793 16.8125 13.4941 16.6091L14.4433 15.8407V21.9089C14.4433 22.4401 14.7597 22.7904 15.2569 22.7904ZM20.9296 22.9034C22.828 22.9034 24.0711 21.6829 24.0711 19.8071C24.0711 18.1234 22.941 16.9707 21.3929 16.9707C20.7036 16.9707 19.9804 17.2985 19.664 17.8296L19.8448 15.4565H23.0879C23.4948 15.4565 23.7999 15.1401 23.7999 14.7107C23.7999 14.2813 23.4948 13.9988 23.0879 13.9988H19.4945C18.873 13.9988 18.5227 14.3717 18.4775 15.0271L18.2514 18.2477C18.1949 18.8579 18.534 19.163 19.0651 19.163C19.4832 19.163 19.6414 19.0839 19.9465 18.8466C20.342 18.4963 20.6697 18.3381 21.1104 18.3381C21.9466 18.3381 22.489 18.9483 22.489 19.841C22.489 20.7676 21.8449 21.4456 20.9861 21.4456C20.342 21.4456 19.8222 21.084 19.5284 20.5416C19.3589 20.2704 19.1555 20.1122 18.8391 20.1122C18.421 20.1122 18.1271 20.406 18.1271 20.8354C18.1271 21.0049 18.161 21.1631 18.2288 21.3326C18.534 22.1123 19.5397 22.9034 20.9296 22.9034Z" fill="white" fill-opacity="0.96"/>
                                </svg>
                            </button>
                        </div>
                        <div>
                            {playerCurrentState === null ? 
                                <input type="range" name="" id="" min={0} max={100} value={0} step={1} disabled/>
                                :
                                <input type="range" name="" id="" min={0} max={Math.floor(playerCurrentState?.duration_ms / 1000)} value={Math.floor(playerCurrentPosition / 1000)} step={1} onChange={(e) => {
                                    seekToPosition("any", e.target.value)
                                }}/>
                            }
                            <div>
                                <p>{fixedPlayerCurrentPosition}</p>
                                <p>{fixedPlayerSongDuration}</p>
                            </div>
                        </div> 
                    </div>
                    <div className={miniPlayerIsMouseEnter || showQueue ? styles.playerPanelBtns : styles.d_none}>
                        <span className={showQueue ? styles.showQueue : ""} onClick={() => {
                            setShowQueue(!showQueue)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path d="M9.89685 16.6726L12.7746 14.9851C13.3623 14.6235 13.3472 13.7496 12.7746 13.4182L9.89685 11.6704C9.17364 11.2485 8.42029 11.5047 8.42029 12.3484V16.0247C8.42029 16.8384 9.17364 17.0945 9.89685 16.6726ZM18.696 15.6029H38.1022C38.9158 15.6029 39.5637 14.9701 39.5637 14.1564C39.5637 13.3428 38.9309 12.71 38.1022 12.71H18.696C17.8974 12.71 17.2495 13.3428 17.2495 14.1564C17.2495 14.9701 17.8823 15.6029 18.696 15.6029ZM9.89685 25.9237L12.7746 24.2212C13.3623 23.8746 13.3472 23.0007 12.7746 22.6542L9.89685 20.9215C9.17364 20.4846 8.42029 20.7407 8.42029 21.5845V25.2608C8.42029 26.0744 9.17364 26.3305 9.89685 25.9237ZM18.696 24.869H38.1022C38.9158 24.869 39.5637 24.2362 39.5637 23.4226C39.5637 22.609 38.9309 21.9762 38.1022 21.9762H18.696C17.8974 21.9762 17.2495 22.609 17.2495 23.4226C17.2495 24.2362 17.8823 24.869 18.696 24.869ZM9.89685 35.205L12.7746 33.5175C13.3623 33.1559 13.3472 32.282 12.7746 31.9505L9.89685 30.2028C9.17364 29.7809 8.42029 30.037 8.42029 30.8808V34.542C8.42029 35.3707 9.17364 35.6269 9.89685 35.205ZM18.696 34.1352H38.1022C38.9158 34.1352 39.5637 33.5024 39.5637 32.6888C39.5637 31.8752 38.9309 31.2424 38.1022 31.2424H18.696C17.8974 31.2424 17.2495 31.8752 17.2495 32.6888C17.2495 33.5024 17.8823 34.1352 18.696 34.1352Z" fill="white" fill-opacity="0.96"/>
                            </svg>
                            <p>Queue</p>
                        </span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path d="M16.3308 40.3129C16.9636 40.3129 17.4307 40.0115 18.184 39.3335L23.7437 34.3162L33.5975 34.3313C38.1327 34.3313 40.679 31.7096 40.679 27.2347V15.5277C40.679 11.0528 38.1327 8.43115 33.5975 8.43115H14.3871C9.86705 8.43115 7.30566 11.0528 7.30566 15.5277V27.2347C7.30566 31.7247 9.94238 34.3162 14.2817 34.3162H14.8843V38.6856C14.8843 39.68 15.4117 40.3129 16.3308 40.3129ZM16.5718 19.8067C16.5718 17.9535 17.9731 16.6276 19.8564 16.6276C21.9206 16.6276 23.2766 18.3 23.2766 20.4395C23.2766 24.1309 20.2633 26.0896 18.636 26.0896C18.184 26.0896 17.8375 25.7883 17.8375 25.3664C17.8375 25.0048 18.0183 24.7487 18.5607 24.6131C19.7058 24.3268 20.8358 23.4831 21.333 22.3078H21.1522C20.7454 22.79 20.0975 22.9406 19.4195 22.9406C17.6868 22.9406 16.5718 21.5846 16.5718 19.8067ZM24.8285 19.8067C24.8285 17.9535 26.2298 16.6276 28.0981 16.6276C30.1622 16.6276 31.5333 18.3 31.5333 20.4395C31.5333 24.1309 28.535 26.0896 26.8927 26.0896C26.4407 26.0896 26.1092 25.7883 26.1092 25.3664C26.1092 25.0048 26.29 24.7487 26.8174 24.6131C27.9625 24.3268 29.0925 23.4831 29.5897 22.3078H29.4089C29.0021 22.79 28.3542 22.9406 27.6611 22.9406C25.9435 22.9406 24.8285 21.5846 24.8285 19.8067Z" fill="white" fill-opacity="0.96"/>
                            </svg>
                            <p>Lyrics</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <Queue show={showQueue}/>
    </div>
  )
}

export default MiniPlayer