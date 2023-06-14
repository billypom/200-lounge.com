import styles from '../styles/Tiles.module.css'
import { useRef, useState, useEffect } from 'react'

  /* 
  Tiles Background! ~( ^ o^)_
  */
  
  // let tiles_columns = Math.floor(width / 50),
  // tiles_rows = Math.floor(height / 50)
  // console.log('tiles columns:', tiles_columns)
  // console.log('tiles rows:', tiles_rows)

  // function takes in index

export default function TileGrid() {
  // console.log(typeof window)
  const tiles = useRef()
  // Get size of viewport
  const [isSSR, setIsSSR] = useState(true);
  const [width, setWidth] = useState(typeof window === 'undefined' ? 0 : window.innerWidth) // it will be 0 bcus ssr or something
  const [height, setHeight] = useState(typeof window === 'undefined' ? 0 : window.innerHeight)

  // Get number of squares in columns
  const [tiles_columns, setTiles_Columns] = useState(typeof window === 'undefined' ? 0 : Math.floor(width/50))
  const [tiles_rows, setTiles_Rows] = useState(typeof window === 'undefined' ? 0 : Math.floor(height/50))
  // how many squares
  const [quantity, setQuantity] = useState(typeof window === 'undefined' ? 0 : tiles_columns * tiles_columns)
  // squares are divs :)
  const [divs, setDivs] = useState(typeof window === 'undefined' ? Array.from({length: 1}, (_, index) => {return <div key={index} className={`${styles.tile} dark:before:bg-zinc-900 before:bg-slate-100`}></div>}) : Array.from({length: quantity}, (_, index) => {return <div key={index} className={`${styles.tile} dark:before:bg-zinc-900 before:bg-slate-100`}></div>}))
  // console.log(divs)

  // Handle viewport resize
  useEffect(() => {
    function handleResize() {
      // window is available in useEffect only
      // if (typeof window !== 'undefined') {
          setWidth(typeof window === 'undefined' ? 0 : window.innerWidth)
          setHeight(typeof window === 'undefined' ? 0 : window.innerHeight)
          setTiles_Columns(Math.floor(window.innerWidth/50))
          setTiles_Rows(Math.floor(window.innerHeight/50))
          setQuantity(Math.floor(window.innerWidth/50) * Math.floor(window.innerHeight/50))
          setDivs(Array.from({length: (Math.floor(window.innerWidth/50) * Math.floor(window.innerHeight/50))}, (_, index) => {return <div key={index} className={`${styles.tile} dark:before:bg-zinc-900 before:bg-slate-100`}></div>}))
          tiles.current.style.setProperty('--columns', tiles_columns)
          tiles.current.style.setProperty('--rows', tiles_rows)
      // }
    }
    setIsSSR(false)
    handleResize()
    // console.log('i resized')
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [tiles_columns, tiles_rows]) 
  // need to ^ include this array at the end of use effect for this to work/hydrate properly?
  // terminal warnings told me so

  // create the divs
  // const divs = Array.from({length: quantity}, (_, index) => {
  //   return <div key={index} className={styles.tile}></div>
  // })
  return (
    <div ref={tiles} className={styles.tiles}>
        {!isSSR ? divs : <div>loading...</div>}
    </div>
    )
  }