import Link from 'next/link'
import styles from '../styles/Home.module.css'
import {useEffect, useState } from 'react'
import Image from 'next/image'


export default function Navbar(){
    const [width, setWidth] = useState(typeof window === 'undefined' ? 0 : window.innerWidth)
    const [isMobile, setIsMobile] = useState(true)

    const [open, setOpen] = useState(false)

    useEffect(() => {
        function handleResize() {
            setWidth(typeof window === 'undefined' ? 0 : window.innerWidth)
            setIsMobile(width > 1000 ? false : true)
            if (!isMobile) {
                // close the hamburger menu if we are no longer mobile
                setOpen(width > 1000 ? false : false)
            }
        }
        handleResize()
        console.log('i resized')
        console.log('is mobile: ', isMobile)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
      },)


    return (<>
            <header className={styles.navbar}>
                <div className={styles.navitemwrapper}>
                <ul>
                    <div className={styles.navitem2}>
                        200cc Lounge
                    </div>
                </ul>
                </div>
                <div className={styles.navitemwrapper2}>
                    {isMobile ? <>
                    <div className={styles.navitem3}>
                        <Image src='/icons8-menu.svg' alt='navigation' width='30px' height='30px' onClick={() => setOpen(!open)} />
                    </div>

                    </> : <>

                    <Link href="/">
                        <ul className={styles.navitem}>
                            leaderboard
                        </ul>
                    </Link>
                    <Link href="/records">
                        <ul className={styles.navitem}>
                            records
                        </ul>
                    </Link>
                    <a href="https://discord.gg/uR3rRzsjhk">
                        <ul className={styles.navitem}>
                            discord
                        </ul>
                    </a>
                    <a href="https://www.mariokartcentral.com/forums/index.php?threads/s4-mk8dx-200cc-lounge-rules-updated-may-1-2022.7129/">
                        <ul className={styles.navitem}>
                            rules
                        </ul>
                    </a></>}
                </div>
            </header>
            {open ? 
            <div className={styles.navdropdown}>
                <Link href="/">
                    <ul className={styles.navitem} onClick={() => setOpen(!open)}>
                        leaderboard
                    </ul>
                </Link>
                <Link href="/records">
                    <ul className={styles.navitem} onClick={() => setOpen(!open)}>
                        records
                    </ul>
                </Link>
                <a href="https://discord.gg/uR3rRzsjhk">
                    <ul className={styles.navitem} onClick={() => setOpen(!open)}>
                        discord
                    </ul>
                </a>
                <a href="https://www.mariokartcentral.com/forums/index.php?threads/s4-mk8dx-200cc-lounge-rules-updated-may-1-2022.7129/">
                    <ul className={styles.navitem} onClick={() => setOpen(!open)}>
                        rules
                    </ul>
                </a>
            </div> 
            : <></>}
        </>
            
    )
}