import Image from 'next/image'

type SvgLogoProps = {
    src: string
    darkSrc?: string
    alt: string
    className?: string
}

function SvgLogo({ src, darkSrc, alt, className = 'size-8' }: SvgLogoProps) {
    return (
        <>
            <Image
                src={src}
                alt={alt}
                width={48}
                height={48}
                className={`${darkSrc ? 'dark:hidden' : ''} m-auto object-contain ${className}`}
            />
            {darkSrc ? (
                <Image
                    src={darkSrc}
                    alt={alt}
                    width={48}
                    height={48}
                    className={`m-auto hidden object-contain dark:block ${className}`}
                />
            ) : null}
        </>
    )
}

function LogoBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-illustration relative shadow-md shadow-black/10">
            {children}
        </div>
    )
}

export default function IntegrationsSection() {
    return (
        <section className="bg-background py-24">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto max-w-3xl">
                    <div
                        aria-hidden
                        className="aspect-ratio *:ring-border grid grid-cols-8 gap-px *:flex *:aspect-square *:rounded-xl *:ring-1 sm:grid-cols-10">
                        <div
                            aria-hidden
                            className="max-sm:hidden"
                        />
                        <LogoBox>
                            <SvgLogo src="/integrations-svgl/google-sheets.svg" alt="Google Sheets" />
                        </LogoBox>
                        <div aria-hidden />
                        <LogoBox>
                            <SvgLogo src="/integrations-svgl/claude.svg" alt="Claude" />
                        </LogoBox>
                        <div aria-hidden />
                        <LogoBox>
                            <SvgLogo src="/integrations-svgl/slack.svg" alt="Slack" />
                        </LogoBox>
                        <div aria-hidden />
                        <LogoBox>
                            <SvgLogo
                                src="/integrations-svgl/github-light.svg"
                                darkSrc="/integrations-svgl/github-dark.svg"
                                alt="GitHub"
                            />
                        </LogoBox>
                        <div />
                        <div
                            aria-hidden
                            className="max-sm:hidden"
                        />

                        <LogoBox>
                            <SvgLogo src="/integrations-svgl/gmail.svg" alt="Gmail" />
                        </LogoBox>
                        <div
                            aria-hidden
                            className="max-sm:hidden"
                        />
                        <LogoBox>
                            <SvgLogo src="/integrations-svgl/apollo.svg" alt="Apollo" />
                        </LogoBox>
                        <div aria-hidden />
                        <LogoBox>
                            <SvgLogo
                                src="/integrations-svgl/openai-light.svg"
                                darkSrc="/integrations-svgl/openai-dark.svg"
                                alt="ChatGPT"
                            />
                        </LogoBox>
                        <div aria-hidden />
                        <LogoBox>
                            <SvgLogo src="/integrations-svgl/telegram.svg" alt="Telegram" />
                        </LogoBox>
                        <div aria-hidden />
                        <div
                            aria-hidden
                            className="max-sm:hidden"
                        />
                        <LogoBox>
                            <SvgLogo src="/integrations-svgl/supabase.svg" alt="Supabase" />
                        </LogoBox>

                        <div
                            aria-hidden
                            className="max-sm:hidden"
                        />
                        <LogoBox>
                            <SvgLogo src="/integrations-svgl/instagram.svg" alt="Instagram" />
                        </LogoBox>
                        <div aria-hidden />
                        <LogoBox>
                            <SvgLogo src="/integrations-svgl/drive.svg" alt="Google Drive" />
                        </LogoBox>
                        <div aria-hidden />
                        <div
                            aria-hidden
                            className="max-sm:hidden"
                        />
                        <div aria-hidden />
                        <div aria-hidden />
                        <div
                            aria-hidden
                            className="max-sm:hidden"
                        />
                        <div aria-hidden />
                    </div>
                </div>
            </div>
        </section>
    )
}
