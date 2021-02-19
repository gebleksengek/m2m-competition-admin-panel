import { useRef, useLayoutEffect } from 'react'

const isBrowser = typeof window !== undefined

const getScrollPosition = ({ element, useWindow }) => {
    if (!isBrowser) return { x: 0, y: 0 }

    const target = element ? element.current : document.body
    const position = target.getBoundingClientRect()

    return useWindow ? { x: window.scrollX, y: window.scrollY } : { x: position.left, y: position.top }
}

export const useScrollPosition = (effect, deps, element, useWindow, wait) => {
    const position = useRef(getScrollPosition({ useWindow }))

    let throttleTimeout = null

    const callback = () => {
        const currPos = getScrollPosition({ element, useWindow })
        effect({ prevPos: position.current, currPos })
        position.current = currPos
        throttleTimeout = null
    }

    useLayoutEffect(() => {
        const handleScroll = () => {
            if (wait) {
                if (throttleTimeout === null) {
                    throttleTimeout = setTimeout(callback, wait)
                }
            } else {
                callback()
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, deps)
}