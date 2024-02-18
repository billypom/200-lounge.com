import styles from '../styles/Navbar.module.css'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'


export default function SeasonPicker2(props) {
    const [width, setWidth] = useState(typeof window === 'undefined' ? 0 : window.innerWidth)
    const [isMobile, setIsMobile] = useState(false)
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    const buttonRef = useRef(null)



    //  Get current path, season agnostic
    const router = useRouter()
    var current_season = router.query.season || props.currentSeason

    // Change season
    const changeSeason = (newSeason) => {
        // Extract the path without query parameters from asPath
        const pathWithoutQuery = router.asPath.split('?')[0]
        // Construct newPath using pathname as href and pathWithoutQuery as as
        const newPath = {
            pathname: router.pathname,
            query: { ...router.query, season: newSeason } // Preserve existing query parameters and update the season
        }
        const asPath = `${pathWithoutQuery}?season=${newSeason}`
        props.setCurrentSeason(newSeason) // Set current season to retain button choice styling across pages
        handleMobileSeasonChoice(newSeason) // Close the window if we are mobile
        router.push(newPath, asPath) // Go to new page
    }

    // Closes the menus after choice for mobile devices
    function handleMobileSeasonChoice(seasonChoice) {
        props.setCurrentSeason(seasonChoice)
        setOpen(!open)
    }


    // Resize listener
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

    // Clicking outside the picker listener
    useEffect(() => {
        function handleOutsideClick(event) {
            if (buttonRef.current?.contains(event.target)) {
                return
            }
            if (!ref.current?.contains(event.target)) {
                setOpen(false)
            }
        }
        window.addEventListener("mousedown", handleOutsideClick)
        return () => window.removeEventListener("mousedown", handleOutsideClick)
    }, [ref])




    return (<>
        <header className={styles.navbar}>
            <div className={styles.navitemwrapper}>
                {/* This bit here is required to move the picker to the right side of screen */}
            </div>
            <div className={styles.navitemwrapper2}>
                {isMobile ? <>
                    <div className={styles.navitem3} onClick={() => setOpen(!open)} ref={buttonRef} >
                        S{current_season}
                        {/* <Image src='/icons8-menu.svg' alt='navigation' width='30px' height='30px' onClick={() => setOpen(!open)} /> */}
                    </div>

                </> :
                    // Normal web season picker
                    <>
                        <button
                            className={current_season == 5 ? styles.navitemactive : styles.navitem}
                            onClick={() => changeSeason(5)}
                        >
                            season 5
                        </button>

                        <button
                            className={current_season == 6 ? styles.navitemactive : styles.navitem}
                            onClick={() => changeSeason(6)}
                        >
                            season 6
                        </button>

                        <button
                            className={current_season == 7 ? styles.navitemactive : styles.navitem}
                            onClick={() => changeSeason(7)}
                        >
                            season 7
                        </button>
                    </>}
            </div>
        </header>
        {/* Mobile season picker is OPEN */}
        {open ?
            <div className={styles.navdropdown2} ref={ref}>
                <button
                    className={current_season == 5 ? styles.navitemactive : styles.navitem}
                    onClick={() => changeSeason(5)}>
                    season 5
                </button>

                <button
                    className={current_season == 6 ? styles.navitemactive : styles.navitem}
                    onClick={() => changeSeason(6)}>
                    season 6
                </button>

                <button
                    className={current_season == 7 ? styles.navitemactive : styles.navitem}
                    onClick={() => changeSeason(7)}>
                    season 7
                </button>
            </div>
            : <></>}
    </>

    )
}