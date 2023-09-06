import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'


export default function SeasonPicker(props) {
    const [width, setWidth] = useState(typeof window === 'undefined' ? 0 : window.innerWidth)
    const [isMobile, setIsMobile] = useState(false)
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    //  Get current path, season agnostic
    const router = useRouter()
    let routePath = router.asPath.split('/')
    let currentPageName = ''

    for (var i = 0; i < routePath.length; i++) {
        if (routePath[i] == '') {
            continue
            
        } else if (routePath[i].length == 2){
            continue
        } else {
            currentPageName += `/${routePath[i]}`
        }
    }
    let seasonPickerIgnoredList = ['', '/rules']
    if (seasonPickerIgnoredList.includes(currentPageName)) {
        currentPageName = '/'
    }
    // if (currentPageName == '') {
    //     currentPageName = '/'
    // }
    // if (currentPageName == '/rules') {
    //     currentPageName = '/'
    // }
    // console.log(currentPageName)



    // Closes the menus after choice for mobile devices
    function handleMobileSeasonChoice(e, seasonChoice){
        props.setCurrentSeason(seasonChoice)
        e.stopPropogation()
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
        <header className={styles.navbar}>
            <div className={styles.navitemwrapper}>
            </div>
            <div className={styles.navitemwrapper2} ref={ref}>
                {isMobile ? <>
                    <div className={styles.navitem3} onClick={() => setOpen(!open)}>
                        S{props.currentSeason}
                        {/* <Image src='/icons8-menu.svg' alt='navigation' width='30px' height='30px' onClick={() => setOpen(!open)} /> */}
                    </div>

                </> : 
                // Normal web season picker
                <>
                    <Link href={`/s5${currentPageName}`}>
                        <button
                            className={props.currentSeason == 5 ? styles.navitemactive : styles.navitem}
                            onClick={() => props.setCurrentSeason(5)}
                        >
                            season 5
                        </button>
                    </Link>
                    {/* <Link href={'/' + currentPageName}> */}
                    <Link href={`${currentPageName}`}>
                        <button
                            className={props.currentSeason == 6 ? styles.navitemactive : styles.navitem}
                            onClick={() => props.setCurrentSeason(6)}
                        >
                            season 6
                        </button>
                    </Link>
                </>}
            </div>
        </header>
        {/* Mobile season picker is OPEN */}
        {open ?
            <div className={styles.navdropdown2}>
                <Link href={`/s5${currentPageName}`}>
                        <button
                            className={props.currentSeason == 5 ? styles.navitemactive : styles.navitem}
                            onClick={(e) => handleMobileSeasonChoice(e, 5)}>
                            season 5
                        </button>
                    </Link>
                    {/* <Link href={'/' + currentPageName}> */}
                    <Link href={`${currentPageName}`}>
                        <button
                            className={props.currentSeason == 6 ? styles.navitemactive : styles.navitem}
                            onClick={(e) => handleMobileSeasonChoice(e, 6)}>
                            season 6
                        </button>
                    </Link>
            </div>
            : <></>}
    </>

    )
}