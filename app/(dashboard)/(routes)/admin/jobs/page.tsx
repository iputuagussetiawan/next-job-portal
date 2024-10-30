import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const JobsPageOverview = async() => {
  return (
    <div className='py-6 px-6'>
      <div className="flex items-end justify-end">
        <Link href={"/admin/create"}>
          <Button>
            <Plus className='w-5 h-5 mr-2'/>
            New Job
          </Button>
        </Link>
      </div>

      <div>
        <h1>Jobs Listing</h1>
      </div>
    </div>
  )
}

export default JobsPageOverview