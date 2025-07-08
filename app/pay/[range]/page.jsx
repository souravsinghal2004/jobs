
import { getJobsByPayRange } from '@/actions/server'
import JobCard from '@/components/job-card'

export default async function PayPage({ params }) {
  const [minRaw, maxRaw] = params.range.split('-').map(Number)

  // Convert actual ₹ to K-based values for DB (i.e., 20000 → 20)
  const min = Math.floor(minRaw / 1000)
  const max = Math.ceil(maxRaw / 1000)

  const jobs = await getJobsByPayRange(min, max)

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Jobs with salary ₹{minRaw.toLocaleString()} – ₹{maxRaw.toLocaleString()}
      </h2>

      <div className='grid grid-cols-3'>
          {jobs.length === 0 ? (
            <p>No jobs found in this pay range.</p>
          ) : (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          )}
      </div>
    </div>
  )
}
