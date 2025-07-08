import React from 'react';
import { getJobById } from '@/actions/server';
import NotFound from '@/app/not-found';
import { JobDetails } from './_components/job-details';

export default async function JobDetailsPage({ params }) {
  const { id } = params; // ✅ FIXED: removed `await`
  const result = await getJobById(id);


  
  if (!result.success) {
    return <NotFound />; // ✅ FIXED: use `return`
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <JobDetails job={result.data} />
    </div>
  );
}
