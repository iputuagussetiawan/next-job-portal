'use client'
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

interface SidebarRouteItemProps {
    icon: LucideIcon;
    label: string;
    href: string;   
}

export const SidebarRouteItem = ({icon:Icon, label, href}:SidebarRouteItemProps) => {
    const pathname=usePathname();
    const router=useRouter();
    const isActive=(pathname==="/" && href==="/") || pathname?.startsWith(`${href}/`);
    const onClick=()=>{
        router.push(href)
    }
    return (
        <button onClick={onClick} className={cn("flex items-center gap-x-2 text-neutral-500 text-sm font-[500] pl-6 transition-all hover:text-green-500 hover:bg-neutral-300/20",
            isActive && "text-green-500 bg-green-200/20 hover:bg-green-700/20")}>
            <div className="flex items-center gap-x-2 py-4">
                <Icon size={22}></Icon>
                {label}
            </div>
            <div className={cn("ml-auto opacity-0 border-2 border-green-700 h-full transition-all",isActive && "opacity-100")}></div>
        </button>
    )
}
