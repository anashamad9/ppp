import { Openai } from '@/components/ui/svgs/openai'
import { Claude } from '@/components/ui/svgs/claude'
import { Code2, Play } from 'lucide-react'
import Image from 'next/image'

type Model = {
    name: string
    icon: React.ReactNode
}

const AtmetMark = ({ high = false }: { high?: boolean }) => (
    <Image
        src="/Atmet%20dark%20mode.svg"
        alt="Atmet"
        width={24}
        height={24}
        className={`size-5 object-contain ${high ? 'hue-rotate-[250deg] saturate-[2.5] brightness-[1.15]' : ''}`}
    />
)

export const Models3Illustration = () => {
    const models: Model[] = [
        { name: 'Atmet Default', icon: <AtmetMark /> },
        { name: 'Atmet High', icon: <AtmetMark high /> },
        { name: 'ChatGPT', icon: <Openai className="fill-foreground" /> },
        { name: 'Claude', icon: <Claude className="fill-foreground" /> },
        { name: 'Custom API', icon: <Code2 /> },
    ]
    return (
        <div
            aria-hidden
            className="min-w-sm relative">
            <div className="perspective-dramatic flex flex-col gap-4">
                <div className="mask-radial-[100%_100%] mask-radial-from-75% mask-radial-at-top-left rotate-x-5 rotate-z-6 -rotate-4 pl-6 pt-1">
                    <div className="ring-border-illustration bg-background/75 shadow-black/6.5 rounded-tl-2xl px-2 pt-4 shadow-lg ring-1">
                        <div className="text-muted-foreground mb-3 flex items-center gap-2.5 px-3 font-medium">
                            Atmet models <Play className="size-2.5 translate-y-0.5 rotate-90 fill-current opacity-50" />
                        </div>

                        <div className="bg-illustration ring-border-illustration flex flex-col gap-4 rounded-tl-xl pl-5 pt-5 shadow ring-1">
                            {models.map((model, index) => (
                                <div
                                    key={index}
                                    className="grid origin-bottom grid-cols-[1.5rem_auto] items-center gap-3 [&_svg]:size-5">
                                    <span className="flex size-6 items-center justify-center">
                                        {model.icon}
                                    </span>
                                    <span className="text-base">{model.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Models3Illustration
