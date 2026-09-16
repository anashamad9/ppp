'use client'

import { cn } from '@/lib/utils'
import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion, LayoutGroup } from 'motion/react'
import { PlusCircle } from 'lucide-react'
import { ServerIllustration } from "@/components/ui/illustrations/server-illustration"

const AUTOPLAY_DURATION = 7000

const features = [
    {
        title: 'Save more than 50% of your business cost',
        description: 'Cut operational expenses and manual overhead by over 50% using targeted AI automation.',
    },
    {
        title: 'reduce your humain interaction',
        description: 'Minimize repetitive human touchpoints with intelligent workflows and autonomous task execution.',
    },
    {
        title: 'cusomizlbe AI solution',
        description: 'Deploy fully customizable AI systems tailored to your business logic, data, and scale requirements.',
    },
]

export default function ExpandableFeatures() {
    const [expandedIndex, setExpandedIndex] = useState<number>(0)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const resetTimer = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            setExpandedIndex((current) => (current + 1) % features.length)
        }, AUTOPLAY_DURATION)
    }, [])

    useEffect(() => {
        resetTimer()
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [resetTimer])

    const handleSelect = (index: number) => {
        if (index === expandedIndex) return
        setExpandedIndex(index)
        resetTimer()
    }

    return (
        <section className="bg-background @container pt-24">
            <div className="mx-auto max-w-xl px-0">
                <div className="max-w-xl">
                    <h2 className="text-foreground text-left text-xl leading-7 font-medium tracking-normal">Ship with confidence</h2>
                    <p className="mt-1 max-w-xl text-left text-sm leading-5 font-light text-black/45">From prototype to production, every tool you need in one place.</p>
                </div>
            </div>
            <div className="relative mt-16 pb-24">
                <div className="mx-auto max-w-xl px-0">
                    <div className="grid items-end max-lg:gap-12 lg:grid-cols-5">
                        <div className="relative lg:col-span-2 lg:pb-12">
                            <div className="space-y-3 max-lg:px-16 max-sm:px-9">
                                <LayoutGroup>
                                    {features.map((feature, index) => {
                                        const isActive = expandedIndex === index
                                        return (
                                            <motion.div
                                                layout
                                                layoutDependency={expandedIndex}
                                                layoutId={feature.title}
                                                key={feature.title}
                                                data-expanded={isActive}
                                                initial={false}
                                                animate={{
                                                    paddingTop: isActive ? 18 : 0,
                                                    paddingBottom: isActive ? 18 : 0,
                                                    width: isActive ? '100%' : 'fit-content',
                                                }}
                                                transition={{
                                                    layout: { type: 'spring', bounce: 0.2, duration: 0.5 },
                                                    type: 'spring',
                                                    bounce: 0.2,
                                                    duration: 0.5,
                                                }}
                                                className={cn('ring-border group relative min-w-0 max-w-xs overflow-hidden rounded-md text-left ring transition-colors duration-500', isActive ? 'bg-card dark:bg-muted/50 shadow-black/4 ring-border w-full shadow-md' : 'text-muted-foreground hover:text-foreground')}>
                                                <AnimatePresence initial={false}>
                                                    {!isActive && (
                                                        <motion.button
                                                            layout="position"
                                                            onClick={() => handleSelect(index)}
                                                            initial={{ opacity: 0, filter: 'blur(4px)', y: 4 }}
                                                            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                                                            exit={{ opacity: 0, filter: 'blur(4px)', y: -4 }}
                                                            transition={{ duration: 0.5 }}
                                                            className="flex h-10 cursor-pointer items-center gap-2 px-4">
                                                            <PlusCircle className="size-3.5" />
                                                            <h3 className="text-nowrap text-sm font-medium">{feature.title}</h3>
                                                        </motion.button>
                                                    )}

                                                    {isActive && (
                                                        <motion.div
                                                            layout="position"
                                                            initial={{ opacity: 0, height: 0, filter: 'blur(4px)', y: 4 }}
                                                            animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)', y: 0 }}
                                                            exit={{ opacity: 0, height: 0, filter: 'blur(4px)', y: -4 }}
                                                            transition={{
                                                                duration: 0.6,
                                                                type: 'spring',
                                                                bounce: 0.2,
                                                            }}
                                                            className="px-6">
                                                            <p className="text-muted-foreground max-w-md">
                                                                <strong className="text-foreground font-medium">{feature.title}.</strong> {feature.description}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        )
                                    })}
                                </LayoutGroup>
                            </div>
                        </div>
                        <div className="flex max-lg:row-start-1 max-lg:mx-auto max-lg:w-full max-lg:max-w-md lg:col-span-3 lg:justify-end">
                            <div className="@max-lg:mx-auto -space-y-28">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        y: expandedIndex > 0 ? -20 : 0,
                                    }}
                                    transition={{ delay: expandedIndex === 0 ? 0.15 : 0, type: 'spring', bounce: 0.3, duration: 0.8 }}
                                    className="z-2 relative">
                                    <ServerIllustration isActive={expandedIndex === 0} />
                                </motion.div>
                                <motion.div
                                    initial={false}
                                    animate={{
                                        y: expandedIndex === 2 ? -26 : expandedIndex === 0 ? 12 : -6,
                                    }}
                                    transition={{ delay: expandedIndex === 1 ? 0.15 : 0.075, type: 'spring', bounce: 0.3, duration: 0.8 }}
                                    className="z-1 relative">
                                    <ServerIllustration isActive={expandedIndex === 1} />
                                </motion.div>
                                <motion.div
                                    initial={false}
                                    animate={{
                                        y: expandedIndex < 2 ? 6 : 0,
                                    }}
                                    transition={{ delay: 0.15, type: 'spring', bounce: 0.3, duration: 0.8 }}
                                    className="relative">
                                    <ServerIllustration isActive={expandedIndex === 2} />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
