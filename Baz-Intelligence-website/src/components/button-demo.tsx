import { PlusIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button, type ButtonProps } from '@/components/animate-ui/components/buttons/button'

interface ButtonDemoProps extends Omit<ButtonProps, 'children' | 'variant' | 'size' | 'className'> {
    variant: ButtonProps['variant']
    size: ButtonProps['size']
    label?: ReactNode
    className?: string
}

export default function ButtonDemo({ variant, size, label = 'Click me', className, ...buttonProps }: ButtonDemoProps) {
    return (
        <Button
            variant={variant}
            size={size}
            className={className}
            {...buttonProps}
        >
            {size === 'icon' ? <PlusIcon /> : label}
        </Button>
    )
}
