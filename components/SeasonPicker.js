import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'


export default function SeasonPicker(props) {
    const [width, setWidth] = useState(typeof window === 'undefined' ? 0 : window.innerWidth)
    const [isMobile, setIsMobile] = useState(false)
    const [open, setOpen] = useState(false)

    //  Get current path, season agnostic
    const router = useRouter()
    let routePath = router.asPath.split('/')
    let currentPageName = ''
    console.log(routePath)

    for (var i = 0; i < routePath.length; i++) {
        if (routePath[i] == '') {
            console.log(`${i} | i was blank`)
            continue
            
        } else if (routePath[i].length == 2){
            console.log(`${i} | i was 2`)
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
        // console.log('i resized')
        // console.log('is mobile: ', isMobile)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    },)

    return (<>
        <header className={styles.navbar}>
            <div className={styles.navitemwrapper}>
            </div>
            <div className={styles.navitemwrapper2}>
                {isMobile ? <>
                    <div className={styles.navitem3} onClick={() => setOpen(!open)}>
                        S{props.currentSeason}
                        {/* <Image src='/icons8-menu.svg' alt='navigation' width='30px' height='30px' onClick={() => setOpen(!open)} /> */}
                    </div>

                </> : <>
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
        {open ?
            <div className={styles.navdropdown2}>
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
            </div>
            : <></>}
    </>

    )
}