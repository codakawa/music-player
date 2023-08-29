import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    searchLoader: false,
    searchError: false,
    trackSearchResult: null,
    playlistSearchResult: null,
    albumSearchResult: null,
    artistSearchResult: null,
}

export const searchRequest = createAsyncThunk(
    "searchRequest",
    async(reqParams, {dispatch}) => {
        try {
            dispatch(changeSearchLoader(true))
            dispatch(changeSearchError(false))

            const { data } = await axios.get(`https://api.spotify.com/v1/search?q=${reqParams.search_q}&type=${reqParams.type}&limit=${reqParams.limit}&offset=${reqParams.offset}`, {
                headers: {'Authorization': `${reqParams.tokenType} ${reqParams.token}`}
            })
            dispatch(changeAlbumSearchResult(data.albums))
            dispatch(changeTrackSearchResult(data.tracks))
            dispatch(changeArtistSearchResult(data.artists))
            dispatch(changePlaylistSearchResult(data.playlists))

            dispatch(changeSearchLoader(false))
        } catch(err) {
            console.log(err);
            dispatch(changeSearchLoader(false))
            dispatch(changeSearchError(true))
        }
        
    }
)


const searchState = createSlice({
    name: "searchState",
    initialState,
    reducers: {
        changeSearchLoader: (state, action) => {
            state.searchLoader = action.payload
        },
        changeTrackSearchResult: (state, action) => {
            state.trackSearchResult = action.payload
        },
        changeAlbumSearchResult: (state, action) => {
            state.albumSearchResult = action.payload
        },
        changePlaylistSearchResult: (state, action) => {
            state.playlistSearchResult = action.payload
        },
        changeArtistSearchResult: (state, action) => {
            state.artistSearchResult = action.payload
        },
        changeSearchError: (state, action) => {
            state.searchError = action.payload
        },
    },
})

export const {
    changeSearchLoader,
    changeTrackSearchResult,
    changeArtistSearchResult,
    changePlaylistSearchResult,
    changeAlbumSearchResult,
    changeSearchError,
} = searchState.actions;
export default searchState.reducer;