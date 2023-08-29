import { combineReducers, configureStore } from "@reduxjs/toolkit"
import mainMusicState from "./reducers/mainMusicState"
import searchState from "./reducers/searchState";
// import { getDefaultMiddleware } from "@reduxjs/toolkit";
const reducer = combineReducers({
    mainMusicState,
    searchState
});
export const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

