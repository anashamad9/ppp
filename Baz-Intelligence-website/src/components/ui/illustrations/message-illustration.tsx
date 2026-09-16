import Image from 'next/image'

const MESCHAC_AVATAR = 'https://avatars.githubusercontent.com/u/47919550?v=4'

export const MessageIllustration = () => (
    <div aria-hidden>
        <div className="flex items-center gap-2">
            <Image
                src={MESCHAC_AVATAR}
                className="size-4 rounded-full"
                alt="Méschac Irung"
                width="46"
                height="46"
            />
            <span className="text-sm">Ops team</span>
        </div>

        <div className="ring-border-illustration bg-illustration mt-2 w-fit rounded-2xl rounded-tl p-3 text-sm shadow ring-1">
            Invite <span className="text-primary">@finance</span> with approval access only.
        </div>
    </div>
)
