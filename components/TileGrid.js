import styles from '../styles/Home.module.css'
import { useRef, useState, useEffect } from 'react'

  /* 
  Tiles Background! ~( ^ o^)_
  */
  
  // let tiles_columns = Math.floor(width / 50),
  // tiles_rows = Math.floor(height / 50)
  // console.log('tiles columns:', tiles_columns)
  // console.log('tiles rows:', tiles_rows)

  // function takes in index

export default function TileGrid({ rows }) {
  const tiles = useRef()
  // Get size of viewport
  const [width, setWidth] = useState(typeof window === 'undefined' ? 1 : window.innerWidth) // it will be 0 bcus ssr or something
  const [height, setHeight] = useState(typeof window === 'undefined' ? 1 : window.innerHeight)

  // Get number of squares in columns
  const [tiles_columns, setTiles_Columns] = useState(Math.floor(width/50))
  const [tiles_rows, setTiles_Rows] = useState(Math.floor(height/50))
  // how many squares
  const [quantity, setQuantity] = useState(tiles_columns * tiles_columns)
  // squares are divs :)
  const [divs, setDivs] = useState(Array.from({length: quantity}, (_, index) => {return <div key={index} className={styles.tile}></div>}))

  // Handle viewport resize
  useEffect(() => {
    function handleResize() {
      // window is available in useEffect only
      if (typeof window !== 'undefined') {
          setWidth(window.innerWidth)
          setHeight(window.innerHeight)
          setTiles_Columns(Math.floor(window.innerWidth/50))
          setTiles_Rows(Math.floor(window.innerHeight/50))
          setQuantity(Math.floor(window.innerWidth/50) * Math.floor(window.innerHeight/50))
          setDivs(Array.from({length: (Math.floor(window.innerWidth/50) * Math.floor(window.innerHeight/50))}, (_, index) => {return <div key={index} className={styles.tile}></div>}))
          tiles.current.style.setProperty('--columns', tiles_columns)
          tiles.current.style.setProperty('--rows', tiles_rows)
          ssr: false
      }
    }
    ssr: false
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  })

  // create the divs
  // const divs = Array.from({length: quantity}, (_, index) => {
  //   return <div key={index} className={styles.tile}></div>
  // })
  return (
    <div ref={tiles} className={styles.tiles}>
        {divs} 
    </div>
    )
  }