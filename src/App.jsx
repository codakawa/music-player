import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login'
import SpotifyPlayer from 'spotify-web-playback'
import LibraryPage from './pages/LibraryPage/LibraryPage'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import PlayerComp from './components/Player'

function App() {
  const [count, setCount] = useState(0)
  const code = new URLSearchParams(window.location.search).get("code")
  console.log(code);

    if(!code) return <Login/>
    return (
      <Routes>
        <Route path='/' element={<Layout code={code}/>}>
          <Route path='/' element={<LibraryPage/>}/>
        </Route>
        
      </Routes>
  )
}

export default App
