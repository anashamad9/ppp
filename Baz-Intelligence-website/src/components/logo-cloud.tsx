'use client'
import { Bolt } from '@/components/ui/svgs/bolt'
import { Cisco } from '@/components/ui/svgs/cisco'
import { Hulu } from '@/components/ui/svgs/hulu'
import { OpenAIFull } from '@/components/ui/svgs/open-ai'
import { Supabase } from '@/components/ui/svgs/supabase'
import { AnimatePresence, motion } from 'motion/react'
import React, { useEffect, useState } from 'react'
import { VercelFull } from '@/components/ui/svgs/vercel'
import { Spotify } from '@/components/ui/svgs/spotify'

const aiLogos: React.ReactNode[] = [
    <OpenAIFull
        key="openai"
        height={16}
        width="auto"
    />,
    <Bolt
        key="bolt"
        height={13}
        width="auto"
    />,
    <Cisco
        key="cisco"
        height={20}
        width="auto"
    />,
    <Hulu
        key="hulu"
        height={15}
        width="auto"
    />,
    <Spotify
        key="spotify"
        height={16}
        width="auto"
    />,
]

const hostingLogos: React.ReactNode[] = [
    <Supabase
        key="supabase"
        height={16}
        width="auto"
    />,
    <Cisco
        key="cisco"
        height={20}
        width="auto"
    />,
    <Hulu
        key="hulu"
        height={15}
        width="auto"
    />,
    <Spotify
        key="spotify"
        height={16}
        width="auto"
    />,
    <VercelFull
        key="vercel"
        height={13}
        width="auto"
    />,
]

type LogoGroup = 'ai' | 'hosting'

const logos: { [key in LogoGroup]: React.ReactNode[] } = {
    ai: aiLogos,
    hosting: hostingLogos,
}

export default function LogoCloudTwo() {
    const [currentGroup, setCurrentGroup] = useState<LogoGroup>('ai')

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentGroup((prev) => {
                const groups = Object.keys(logos) as LogoGroup[]
                const currentIndex = groups.indexOf(prev)
                const nextIndex = (currentIndex + 1) % groups.length
                return groups[nextIndex]
            })
        }, 2500)

        return () => clearInterval(interval)
    }, [])

    return (
        <section
            className="bg-transparent py-0">
            <div className="mx-0 px-0">
                <div className="perspective-dramatic grid w-fit grid-cols-5 items-center gap-x-0.5 gap-y-0">
                    <AnimatePresence
                        initial={false}
                        mode="popLayout">
                        {logos[currentGroup].map((logo, i) => (
                            <motion.div
                                key={`${currentGroup}-${i}`}
                                className="**:fill-foreground! flex items-center justify-center px-0"
                                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -24, filter: 'blur(6px)', scale: 0.5 }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}>
                                {logo}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
