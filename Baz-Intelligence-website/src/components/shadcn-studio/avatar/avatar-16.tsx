import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

type Language = 'en' | 'ar'

type AvatarPerson = {
  src?: string
  fallback: string
  name: Record<Language, string>
}

const avatars: AvatarPerson[] = [
  {
    src: '/avatars/anas-hamad.png',
    fallback: 'AH',
    name: {
      en: 'Anas Hamad',
      ar: 'أنس حمد'
    }
  },
  {
    src: '/avatars/mohammad-doleh.png',
    fallback: 'MD',
    name: {
      en: 'Mohammad Doleh',
      ar: 'محمد دوله'
    }
  }
]

const AvatarGroupTooltipDemo = ({ language = 'en', tooltipClassName }: { language?: Language; tooltipClassName?: string }) => {
  return (
    <div className='group flex items-center -space-x-2.5' dir='ltr' aria-label={language === 'ar' ? 'المؤسسون' : 'Founders'}>
      {avatars.map((avatar, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Avatar
              tabIndex={0}
              className='size-7 cursor-default rounded-md border border-zinc-200/70 ring-2 ring-white transition-[transform,box-shadow] duration-300 ease-out hover:z-10 hover:-translate-y-1 hover:scale-110 hover:shadow-md focus-visible:z-10 focus-visible:-translate-y-1 focus-visible:scale-110 focus-visible:outline-none dark:ring-[#181615]'
            >
              {avatar.src ? (
                <AvatarImage
                  src={avatar.src}
                  alt={avatar.name[language]}
                  loading='eager'
                  decoding='async'
                  className='rounded-md object-cover'
                />
              ) : null}
              <AvatarFallback className='rounded-md text-xs'>{avatar.fallback}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent side='top' sideOffset={6} className={tooltipClassName}>{avatar.name[language]}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

export default AvatarGroupTooltipDemo
