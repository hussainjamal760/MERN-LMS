'use client'

import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { BiMoon, BiSun } from 'react-icons/bi'

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme, systemTheme, resolvedTheme} = useTheme();

    useEffect(() => {
        setMounted(true)
        console.log('Theme mounted:', theme)
    }, [])

    useEffect(() => {
        // Check after a brief delay to let next-themes update the DOM
        const timer = setTimeout(() => {
            console.log('Current theme:', theme)
            console.log('Resolved theme:', resolvedTheme)
            console.log('System theme:', systemTheme)
            console.log('HTML class:', document.documentElement.className)
            
            // Force update if needed
            if (resolvedTheme) {
                document.documentElement.classList.remove('light', 'dark')
                document.documentElement.classList.add(resolvedTheme)
            }
        }, 100)
        return () => clearTimeout(timer)
    }, [theme, systemTheme, resolvedTheme])

    if(!mounted){
        return <div className="w-[25px] h-[25px]"></div>
    }

    const handleToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        console.log('Switching to:', newTheme)
        setTheme(newTheme)
    }

    return (
        <div className="flex items-center justify-center mx-4">
            {
                (resolvedTheme || theme) === "light" ? (
                    <BiMoon 
                        className='cursor-pointer'
                        fill='black'
                        size={25}
                        onClick={handleToggle}
                    />
                ) : (
                    <BiSun 
                        className='cursor-pointer'
                        fill='white'
                        size={25}
                        onClick={handleToggle}
                    />
                )
            }
        </div>
    )
}

export default ThemeSwitcher