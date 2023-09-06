import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'


export default function Navbar(props) {
    const [width, setWidth] = useState(typeof window === 'undefined' ? 0 : window.innerWidth)
    const [isMobile, setIsMobile] = useState(false)
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        function handleResize() {
            setWidth(typeof window === 'undefined' ? 0 : window.innerWidth)
            setIsMobile(width > 1000 ? false : true)
            if (!isMobile) {
                // close the hamburger menu if we are no longer mobile
                setOpen(false)
            }
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    },)

    useEffect(() => {
        function handleOutsideClick(event) {
            if (!ref.current?.contains(event.target)) {
                setOpen(false)
              }
        }
        // handleOutsideClick()
        window.addEventListener("mousedown", handleOutsideClick)
        return () => window.removeEventListener("mousedown", handleOutsideClick)
    }, [ref])



    return (<>
        {/* <header className={styles.navbar}> */}
        <header className={styles.navbar}>
            <div className={styles.navitemwrapper}>
                <ul>
                    <Link href={props.currentSeason == 6 ? "/" : `/s${props.currentSeason}`}>
                        <div className={styles.navitem}>
                            200cc lounge
                        </div>
                    </Link>
                </ul>
            </div>
            <div className={styles.navitemwrapper2}>
                {isMobile ? <>
                    <div className={styles.navitem3}>
                        <Image src='/icons8-menu.svg' alt='navigation' width='30px' height='30px' onClick={() => setOpen(!open)} ref={ref} />
                    </div>

                </> : <>

                    <Link href={props.currentSeason == 6 ? "/" : `/s${props.currentSeason}`}>
                        {/* onClick={(e) => e.stopPropogation()} */}
                        <ul className={styles.navitem}>
                            leaderboard
                        </ul>
                    </Link>
                    <Link href={props.currentSeason == 6 ? "/records" : `/s${props.currentSeason}/records`}>
                        {/* onClick={(e) => e.stopPropogation()}> */}
                        <ul className={styles.navitem}>
                            records
                        </ul>
                    </Link>
                    <a href="https://discord.gg/uR3rRzsjhk">
                        {/* onClick={(e) => e.stopPropogation()}> */}
                        <ul className={styles.navitem}>
                            discord
                        </ul>
                    </a>
                    <Link href='/rules'>
                        {/* onClick={(e) => e.stopPropogation()} */}
                        <ul className={styles.navitem}>
                            rules
                        </ul>
                    </Link></>}
            </div>
        </header>
        {open ?
            <div className={styles.navdropdown}>
                <Link href="/">
                    <ul className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        leaderboard
                    </ul>
                </Link>
                <Link href="/records">
                    <ul className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        records
                    </ul>
                </Link>
                <a href="https://discord.gg/uR3rRzsjhk">
                    <ul className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        discord
                    </ul>
                </a>
                <Link href='/rules'>
                    <ul className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        rules
                    </ul>
                </Link>
            </div>
            : <></>}
    </>

    )
}