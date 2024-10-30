import React from 'react'

const JobDetailPage =async({params}:{params:{jobId:string}}) => {
    return (
        <div>Job By ID : {params.jobId}</div>
    )
}

export default JobDetailPage