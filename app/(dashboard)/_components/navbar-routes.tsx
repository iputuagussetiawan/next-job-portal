"use client";
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export const NavbarRoutes = () => {
    const pathname=usePathname()
    const isAdminPage=pathname?.startsWith('/admin')
    console.log(isAdminPage)
    const isPlayerPage=pathname?.startsWith('/jobs')
  return (
    <>
        <div className='flex gap-x-2 ml-auto'>
           {isAdminPage || isPlayerPage ? <Link href='/'>
                <Button variant={'outline'}>
                    <LogOut/>Exit
                </Button>
           </Link> : <Link href='/admin/jobs'>
                <Button variant={'outline'}>
                    <LogOut/>Admin Mode
                </Button>
           </Link>}
            <UserButton afterSignOutUrl='/'/>
        </div>
    </>
  )
}
