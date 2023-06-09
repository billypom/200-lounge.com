import * as React from 'react';

import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Rules.module.css'



export default function Rules() {
  return (
    <div className={styles.container}>
      <Head>
        <title>200 Lounge | Rules</title>
        <meta name="description" content="MK8DX 200cc Lounge Rules" />
        <link rel="icon" href="/200.png" />
      </Head>
      <main className={styles.main}>
        {/* <TileGrid /> */}
        <h1 className={styles.title}>
          Under Construction
          </h1>
      </main>
    </div>
  );
}