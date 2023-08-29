import React, { useState } from 'react'
import styles from "AllSongsComponent.module.css"

const AllSongsComponent = () => {
    const songArray = useState([])

  return (
    <div>
        {songArray.map(a => <div>{a.songPoster}</div>)}
    </div>
  )
}

export default AllSongsComponent