import {cva, type VariantProps} from "class-variance-authority"
import { cn } from '@/lib/utils'
import {LucideIcon} from 'lucide-react'

const backgroundVariant=cva("rounded-full flex item-center justify-center",{
    variants:{
        variant:{
            default: "bg-green-100",
            success: "bg-green-50",  
        },
        size:{
            default: "p-2",
            sm: "p-1",
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    }
})

const iconVariant=cva("h-4 w-4",{
    variants:{
        variant:{
            default: "text-green-700",
            success: "text-green-700",  
        },
        size:{
            default: "h-8 w-8",
            sm: "h-4 w-4",
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    }
})  

type BackgroundProps = VariantProps<typeof backgroundVariant>
type IconProps = VariantProps<typeof iconVariant>



interface IconBadgeProps extends BackgroundProps, IconProps{
    icon: LucideIcon
}


const IconBadge = ({icon:Icon, variant, size}:IconBadgeProps) => {
    return (
        <div className={cn(backgroundVariant({variant,size}))}>
            <Icon className={cn(iconVariant({variant,size }))}/>
        </div>
    )
}

export default IconBadge