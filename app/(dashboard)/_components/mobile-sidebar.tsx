import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { Sidebar } from './sidebar'

export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition-all'>
                <Menu/>
            </SheetTrigger>
            <SheetContent className='bg-white p-0' side={"left"}>
                <Sidebar/>
            </SheetContent>
        </Sheet>
    )
}
