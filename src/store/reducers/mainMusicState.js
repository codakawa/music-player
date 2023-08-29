import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import "spotify-web-api-node"
import SpotifyWebApi from "spotify-web-api-node";
// const SpotifyWebApi = require("spotify-web-api-node")

const initialState = {
    searchLoader: false,
    recommendedMusic: null,
    token: null,
    tokenType: null,
    refreshToken: null,
    expiresIn: 3600,
    player: null,
    playerReady: false,
    playerCurrentState: null,
    deviceId: null,
    playerIsPlaying: false,
    playerCurrentPosition: 0,
    playerVolume: 0,
    nextTrackIs: null,
    autoQueueTracks: [],
    localQueue: null,
    shuffleMode: false,
    repeatMode: 0,
}

export const refreshAccessToken = createAsyncThunk(
    "refreshAccessToken",
    async(refreshToken, {dispatch}) => {
        console.log("refreshing");
        axios.post("https://accounts.spotify.com/api/token", {
            "grant_type": 'refresh_token',
            "refresh_token": refreshToken,
            "client_id": "5e6ed4f2972940b597155ee74e2fff3b",
            "client_secret": "9b3af0a0cd474685a51faeb754353629"
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(data => {
            console.log(data.data);
            dispatch(changeToken(data.data.access_token))
            dispatch(changeExpiresIn(data.data.expires_in))
            dispatch(changeTokenType(data.data.token_type))
        }).catch((err) => {
            // window.location = "/"
            console.log(err);
        })

    }
)

export const getAccessToken = createAsyncThunk(
    "getAccessToken",
    async(code, {dispatch}) => {
        console.log(window.location.protocol + "//" + window.location.host + "/");
        console.log("start");
        axios.post("https://accounts.spotify.com/api/token", {
            "grant_type": 'authorization_code',
            "code": code,
            "redirect_uri": window.location.protocol + "//" + window.location.host + "/",
            "client_id": "5e6ed4f2972940b597155ee74e2fff3b",
            "client_secret": "9b3af0a0cd474685a51faeb754353629"
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(data => {
            console.log(data.data);
            dispatch(changeToken(data.data.access_token))
            dispatch(changeExpiresIn(data.data.expires_in))
            dispatch(changeTokenType(data.data.token_type))
            dispatch(changeRefreshToken(data.data.refresh_token))

            window.history.pushState({}, null, "/")
            // const timeout = setTimeout(() => dispatch(refreshAccessToken(res.data.refreshToken)), 100)
            // clearTimeout(timeout)
        })
        .catch((err) => {
            // window.location = "/"
            console.log(err);
        })
    }
)

export const artistsTopTrackSearchRequest = createAsyncThunk(
    "artistsTopTrackSearchRequest",
    async(reqParams, {dispatch}) => {
        try {
            dispatch(changeSearchLoader(true))
            const { data } = await axios.get(`https://api.spotify.com/v1/artists/${reqParams.id}/top-tracks?market=KG`, {
                headers: {'Authorization': `${reqParams.tokenType} ${reqParams.token}`}
            })
            // dispatch(changeSearchLoader(false))
            return data
        } catch(err) {
            console.log(err);
        }
        
    }
)

export const repeatModeChangeReq = createAsyncThunk(
    "repeatModeChangeReq",
    async(reqParams, {dispatch}) => {
        axios.put(`https://api.spotify.com/v1/me/player/repeat?state=${reqParams.mode}&device_id=${reqParams.deviceId}`, {}, {
            headers: {'Authorization': `${reqParams.tokenType} ${reqParams.token}`}
        }).then(() => {
            console.log("repeat mode ", reqParams.mode);
        }).catch(err => console.log(err))    
    }
)
export const shuffleModeChangeReq = createAsyncThunk(
    "snuffleModeChangeReq",
    async(reqParams, {dispatch}) => {
        axios.put(`https://api.spotify.com/v1/me/player/shuffle?state=${reqParams.mode}&device_id=${reqParams.deviceId}`, {}, {
            headers: {'Authorization': `${reqParams.tokenType} ${reqParams.token}`}
        }).then(() => {
            console.log("shuffle mode ", reqParams.mode);
        }).catch(err => console.log(err))    
    }
)

export const playSongRequest = createAsyncThunk(
    "playSongRequest",
    async(reqParams, {dispatch}) => {
        const playSingleSongRequest = (uris) => {
            try {
                axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${reqParams.deviceId}`, {
                    "uris": uris,
                    "offset": {
                        "uri": `${reqParams.firstTrack}`
                    },
                    "position_ms": 0
                }, {
                    headers: {
                        "Authorization": `${reqParams.tokenType} ${reqParams.token}`,
                        "Content-Type": "application/json"
                    }
                })
    
            } catch(err) {
                console.log(err);
            }
        }

        console.log(reqParams);

        try {
            if(reqParams.reqType === "autoQueue" ) {
                const { data } = await axios.get(`https://api.spotify.com/v1/recommendations?limit=100&seed_artists=${reqParams.seedArtist}&seed_tracks=${reqParams.seedTrack}&min_popularity=30`, {
                        headers: {
                            "Authorization": `${reqParams.tokenType} ${reqParams.token}`,
                            "Content-Type": "application/json"
                        }
                })
                
                const uriArray = data.tracks.map(track => track.uri)
                uriArray.unshift(reqParams.uris[0])
                console.log(uriArray);
                dispatch(changeAutoQueueTracks(uriArray))
                
                axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${reqParams.deviceId}`, {
                    "uris": uriArray,
                    "offset": {
                        "uri": `${reqParams.firstTrack}`
                    },
                    "position_ms": 0
                }, {
                    headers: {
                        "Authorization": `${reqParams.tokenType} ${reqParams.token}`,
                        "Content-Type": "application/json"
                    }
                })

            } else if(reqParams.reqType === "single") {
                dispatch(playSingleSongRequest(reqParams.uris))
            } else {
                axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${reqParams.deviceId}`, {
                    "context_uri": reqParams.uris,
                    "position_ms": 0
                }, {
                    headers: {
                        "Authorization": `${reqParams.tokenType} ${reqParams.token}`,
                        "Content-Type": "application/json"
                    }
                })
            }
        } catch(err) {
            console.log(err);
        }
    }
)

export const getPlayerQueue = createAsyncThunk(
    "getPlayerCurrentState",
    async(reqParams, {dispatch}) => {
        console.log("STATE CHANGE");
        const { data } = await axios.get("https://api.spotify.com/v1/me/player/queue", {
            headers: {'Authorization': `${reqParams.tokenType} ${reqParams.token}`}
        })
        dispatch(changeLocalQueue(data))
        console.log(data);
        // dispatch(changePlayerIsPlaying(data.is_playing))
    }
)

export const addTrackAtQueue = createAsyncThunk(
    "addTrackAtQueue",
    async(reqParams, {dispatch}) => {
        axios.post(`https://api.spotify.com/v1/me/player/queue?uri=${reqParams.uri}&device_id=${reqParams.deviceId}`, {}, {
            headers: {'Authorization': `${reqParams.tokenType} ${reqParams.token}`}
        }).then(() => {
            console.log("SONG ADDED AT QUEUE");
        })
    }
)

// export const test = createAsyncThunk(
//     "test",
//     async(reqParams, {dispatch}) => {
//         axios.post(`https://api.spotify.com/v1/me/player/queue`, {
//             queue: []
//         }, {
//             headers: {
//                 "Authorization": `${reqParams.tokenType} ${reqParams.token}`,
//                 "Content-Type": "application/json"
//             }
//         }).then((res) => console.log(res))
//         .catch(err => console.log(err))
//     }
// )



const mainMusicState = createSlice({
    name: "mainMusicState",
    initialState,
    reducers: {
        changeRecommendedMusic: (state, action) => {
            state.recommendedMusic = action.payload
        },
        changeToken: (state, action) => {
            state.token = action.payload
        },
        changeTokenType: (state, action) => {
            state.tokenType = action.payload
        },
        changeExpiresIn: (state, action) => {
            state.expiresIn = action.payload
        },
        changeRefreshToken: (state, action) => {
            state.refreshToken = action.payload
        },
        changeSearchLoader: (state, action) => {
            state.searchLoader = action.payload
        },
        changePlayer: (state, action) => {
            state.player = action.payload
        },
        changePlayerReady: (state, action) => {
            state.playerReady = action.payload
        },
        changePlayerCurrentState: (state, action) => {
            state.playerCurrentState = action.payload
        },
        changeDeviceId: (state, action) => {
            state.deviceId = action.payload
        },
        changePlayerIsPlaying: (state, action) => {
            state.playerIsPlaying = action.payload
        },
        changePlayerCurrentPosition: (state, action) => {
            state.playerCurrentPosition = action.payload
        },
        changePlayerVolume: (state, action) => {
            state.playerVolume = action.payload
        },
        changeNextTrackIs: (state, action) => {
            state.nextTrackIs = action.payload
        },
        changeLocalQueue: (state, action) => {
            state.localQueue = action.payload
        },
        changeRepeatMode: (state, action) => {
            state.repeatMode = action.payload
        },
        changeShuffleMode: (state, action) => {
            state.shuffleMode = action.payload
        },
        changeAutoQueueTracks: (state, action) => {
            state.autoQueueTracks = action.payload
        },
    },
})

export const {
    changeRecommendedMusic,
    changeToken,
    changeTokenType,
    changeExpiresIn,
    changeRefreshToken,
    changeSearchLoader,
    changePlayer,
    changePlayerReady,
    changePlayerCurrentState,
    changeDeviceId,
    changePlayerIsPlaying,
    changePlayerCurrentPosition,
    changePlayerVolume,
    changeNextTrackIs,
    changeLocalQueue,
    changeRepeatMode,
    changeShuffleMode,
    changeAutoQueueTracks,
} = mainMusicState.actions;
export default mainMusicState.reducer;