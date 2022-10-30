import styles from '../styles/Home.module.css'
import Head from 'next/head'
import TileGrid from '../components/TileGrid'
import { useRef, useState, useEffect } from 'react'

  /* 
  Tiles Background! ~( ^ o^)_
  */
  
  // let tiles_columns = Math.floor(width / 50),
  // tiles_rows = Math.floor(height / 50)
  // console.log('tiles columns:', tiles_columns)
  // console.log('tiles rows:', tiles_rows)

  // function takes in index

export default function asd({ rows }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>200 Lounge</title>
        <meta name="description" content="MK8DX 200cc Lounge Leaderboard" />
        <link rel="icon" href="/200.png" />
      </Head>
      <main className={styles.main}>
        <TileGrid />
        <h1 className={styles.title}>
          {/* {width}x{height} | {tiles_columns}x{tiles_rows} | {quantity} */}
          hey
        </h1>
      </main>
  </div>
  )
  }