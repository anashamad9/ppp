import { Play } from 'lucide-react'
import Image from 'next/image'

type model = {
    name: string
    icon: React.ReactNode
}

const AppLogo = ({ src, darkSrc, alt }: { src: string; darkSrc?: string; alt: string }) => (
    <>
        <Image
            src={src}
            alt={alt}
            width={24}
            height={24}
            className={`${darkSrc ? 'dark:hidden' : ''} size-5 object-contain`}
        />
        {darkSrc ? (
            <Image
                src={darkSrc}
                alt={alt}
                width={24}
                height={24}
                className="hidden size-5 object-contain dark:block"
            />
        ) : null}
    </>
)

export const ModelsIllustration = () => {
    const upModels: model[] = [
        { name: 'Gmail', icon: <AppLogo src="/integrations-svgl/gmail.svg" alt="Gmail" /> },
        { name: 'Slack', icon: <AppLogo src="/integrations-svgl/slack.svg" alt="Slack" /> },
        { name: 'Google Sheets', icon: <AppLogo src="/integrations-svgl/google-sheets.svg" alt="Google Sheets" /> },
    ]

    const bottomModels: model[] = [
        { name: 'GitHub', icon: <AppLogo src="/integrations-svgl/github-light.svg" darkSrc="/integrations-svgl/github-dark.svg" alt="GitHub" /> },
        { name: 'Supabase', icon: <AppLogo src="/integrations-svgl/supabase.svg" alt="Supabase" /> },
        { name: 'Drive', icon: <AppLogo src="/integrations-svgl/drive.svg" alt="Google Drive" /> },
    ]

    return (
        <div
            aria-hidden
            className="min-w-xs mask-x-from-75% relative">
            <div className="bg-muted/50 absolute inset-0 my-auto flex h-10 items-center rounded-lg border px-12">
                <Play className="fill-foreground size-2.5" />
            </div>
            <div className="perspective-dramatic flex flex-col items-center gap-4">
                {upModels.map((model, index) => (
                    <div
                        key={index}
                        style={{ opacity: 1 - (upModels.length - 1 - index) * 0.2, transform: `rotateX(${(upModels.length - 1 - index) * 8}deg)` }}
                        className="grid origin-bottom grid-cols-[1.5rem_auto] items-center gap-3">
                        <span className="flex size-6 items-center justify-center">
                            {model.icon}
                        </span>
                        <span className="text-lg">{model.name}</span>
                    </div>
                ))}
                <div className="grid grid-cols-[1.5rem_auto] items-center gap-3">
                    <span className="flex size-6 items-center justify-center">
                        <AppLogo src="/integrations-svgl/telegram.svg" alt="Telegram" />
                    </span>
                    <span className="text-lg">Telegram</span>
                </div>
                {bottomModels.map((model, index) => (
                    <div
                        key={index}
                        style={{ opacity: 1 - index * 0.2, transform: `rotateX(${-index * 8}deg)` }}
                        className="grid origin-top grid-cols-[1.5rem_auto] items-center gap-3">
                        <span className="flex size-6 items-center justify-center">
                            {model.icon}
                        </span>
                        <span className="text-lg">{model.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ModelsIllustration
