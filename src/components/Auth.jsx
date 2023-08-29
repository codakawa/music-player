// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// const Auth = (code) => {
//     const [accessToken, setAccessToken] = useState()
//     const [refreshToken, setRefreshToken] = useState()
//     const [expiresIn, setExpiresIn] = useState()
//     const [authCode, setAuthCode] = useState(code)

//     useEffect(() => {
//       console.log(code);
//       axios.post("http://localhost:5000/login", {
//         code,
//       })
//       .then(res => {
//         console.log(res.data);
//         setAccessToken(res.data.accessToken)
//         setRefreshToken(res.data.refreshToken)
//         setExpiresIn(res.data.expiresIn)
//       })
//       .catch(() => {
//         window.location = "/"
//       })
//     }, [code])


//     return accessToken
// }

// export default Auth



// "{"uris":[["spotify:track:6wf7Yu7cxBSPrRlWeSeK0Q","spotify:track:0u2P5u6lvoDfwTYjAADbn4","spotify:track:4RVwu0g32PAqgUiJoXsdF8","spotify:track:0WFryfbNKPXVtVQlz5dZ8H","spotify:track:3GYlZ7tbxLOxe6ewMNVTkw","spotify:track:3ZCTVFBt2Brf31RLEnCkWJ","spotify:track:2Fxmhks0bxGSBdJ92vM42m","spotify:track:43zdsphuZLzwA9k4DJhU0I","spotify:track:7hDVYcQq6MxkdJGweuCtl9","spotify:track:04sN26COy28wTXYj3dMoiZ"]],"position_ms":0}"