import {useState, useEffect } from 'react'


export default function useWindowDimensions() {
    const [width, setWidth]   = useState(typeof window === 'undefined' ? 0 : window.innerWidth);
    const [height, setHeight] = useState(typeof window === 'undefined' ? 0 : window.innerHeight);

    useEffect(() => {
        function handleResize() {
            if (typeof window !== 'undefined') {
                setWidth(window.innerWidth);
                setHeight(window.innerHeight);
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return {width, height}
}