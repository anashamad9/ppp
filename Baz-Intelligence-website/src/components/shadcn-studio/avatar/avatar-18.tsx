import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export type Avatar18Item = {
  src?: string
  fallback: string
  name: string
}

const defaultAvatars: Avatar18Item[] = [
  {
    src: '/new%20clients/Ehab%20Mousa.jpg',
    fallback: 'EM',
    name: 'Ehab Mousa',
  },
  {
    src: '/new%20clients/Randa%20mitwalli.webp',
    fallback: 'RA',
    name: 'Randa',
  },
  {
    src: '/new%20clients/Yazan%20Al%20billeh.jpeg',
    fallback: 'YA',
    name: 'Yazan Albilleh',
  },
]

const AvatarGroupTooltipTransitionDemo = ({ avatars = defaultAvatars }: { avatars?: Avatar18Item[] }) => {
  return (
    <div className="flex -space-x-3 hover:space-x-1">
      {avatars.map((avatar, index) => (
        <Tooltip key={`${avatar.name}-${index}`}>
          <TooltipTrigger asChild>
            <Avatar className="size-12 ring-2 ring-white transition-all duration-300 ease-in-out">
              {avatar.src ? <AvatarImage src={avatar.src} alt={avatar.name} className="object-cover" /> : null}
              <AvatarFallback className="text-sm">{avatar.fallback}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>{avatar.name}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

export default AvatarGroupTooltipTransitionDemo
