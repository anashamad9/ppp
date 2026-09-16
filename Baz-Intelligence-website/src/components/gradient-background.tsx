'use client'

import { GrainGradient } from '@paper-design/shaders-react'

type GradientVariant = 'white' | 'blue'

type GradientPreset = {
    colorBack: string
    softness: number
    intensity: number
    colors: [string, string, string]
}

const presets: Record<GradientVariant, GradientPreset> = {
    white: {
        colorBack: 'hsl(214, 100%, 98%)',
        softness: 0.74,
        intensity: 0.56,
        colors: ['hsl(220, 85%, 90%)', 'hsl(210, 90%, 94%)', 'hsl(199, 90%, 89%)'],
    },
    blue: {
        colorBack: 'hsl(219, 100%, 50%)',
        softness: 0.76,
        intensity: 0.45,
        colors: ['hsl(219, 100%, 42%)', 'hsl(219, 100%, 50%)', 'hsl(205, 100%, 62%)'],
    },
}

export function GradientBackground({ variant = 'white' }: { variant?: GradientVariant }) {
    const preset = presets[variant]

    return (
        <div className="pointer-events-none absolute inset-0 z-0">
            <GrainGradient
                style={{ height: '100%', width: '100%' }}
                colorBack={preset.colorBack}
                softness={preset.softness}
                intensity={preset.intensity}
                noise={0}
                shape="corners"
                offsetX={0.28}
                offsetY={0}
                scale={1}
                rotation={0}
                speed={1}
                colors={preset.colors}
            />
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(to right, ${preset.colorBack} 0%, ${preset.colorBack} 42%, transparent 74%)`,
                }}
            />
        </div>
    )
}
