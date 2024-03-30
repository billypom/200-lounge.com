import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import SeasonPreservingLink from './SeasonPreservingLink'


export default function Navbar(props) {
    const router = useRouter()
    const [width, setWidth] = useState(typeof window === 'undefined' ? 0 : window.innerWidth)
    const [isMobile, setIsMobile] = useState(false)
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    const buttonRef = useRef(null)

    const changeSeason = () => {
        let newPath = `${router.pathname}?season=${props.season}`;
        Object.keys(router.query).forEach(key => {
          if (key !== 'season') {
            newPath += `&${key}=${router.query[key]}`;
          }
        });
        router.push(newPath);
      };

    // Window resize listener
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

    // Click outside navbar listener
    useEffect(() => {
        function handleOutsideClick(event) {
            if (buttonRef.current?.contains(event.target)) {
                return
            }
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
                    <Link href='/'>
                        <div className={styles.navitem}>
                            200cc Lounge
                        </div>
                    </Link>
                </ul>
            </div>
            <div className={styles.navitemwrapper2} ref={buttonRef}>
                {isMobile ? <>
                    <div className={styles.navitem3}>
                        <Image src='/icons8-menu.svg' className={styles.colorinvert} alt='navigation' width={30} height={30} onClick={() => setOpen(!open)} />
                    </div>

                </> : <>
                    
                    <SeasonPreservingLink to="/">
                        <div className={styles.navitem}>Leaderboard</div>
                    </SeasonPreservingLink>

                    <SeasonPreservingLink to="/records">
                        <div className={styles.navitem}>Records</div>
                    </SeasonPreservingLink>

                    <SeasonPreservingLink to="/stats">
                        <div className={styles.navitem}>Stats</div>
                    </SeasonPreservingLink>

                    <SeasonPreservingLink to="/rules">
                        <div className={styles.navitem}>Rules</div>
                    </SeasonPreservingLink>

                    <a href="https://discord.gg/uR3rRzsjhk">
                        {/* onClick={(e) => e.stopPropogation()}> */}
                        <ul className={styles.navitem}>
                            Discord
                        </ul>
                    </a>
                    </>}
            </div>
        </header>
        {open ?
            <div className={styles.navdropdown} ref={ref}>
                <SeasonPreservingLink to="/">
                    <div className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        Leaderboard
                    </div>
                </SeasonPreservingLink>
                <SeasonPreservingLink to="/records">
                    <div className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        Records
                    </div>
                </SeasonPreservingLink>
                <SeasonPreservingLink to="/stats">
                    <div className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        Stats
                    </div>
                </SeasonPreservingLink>
                <SeasonPreservingLink to="/rules">
                    <div className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        Rules
                    </div>
                </SeasonPreservingLink>
                <a href="https://discord.gg/uR3rRzsjhk">
                    <ul className={styles.navitemmobile} onClick={() => setOpen(!open)}>
                        Discord
                    </ul>
                </a>

            </div>
            : <></>}
    </>

    )
}
