import React from 'react'

function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <div className='h-full'>
            {/* Header */}
            <header className=''>
                Header
            </header>

            {/* Sidebar */}
            <div>Sidebar</div>
            <main>
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout