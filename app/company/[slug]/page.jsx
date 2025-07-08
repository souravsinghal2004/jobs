import { getCompanyJobs } from "@/actions/server";
import JobCard from "@/components/job-card"; // assuming you have a JobCard component
import Link from "next/link";

export default async function CompanyPage({ params }) {
  const companyName = decodeURIComponent(params.slug);
  const jobs = await getCompanyJobs(companyName);

  return (
    <div className="mx-4 px-4 py-10 text-white">
      <h1 className="text-4xl font-bold mb-6">Opportunities at {companyName}</h1>

      {jobs.length === 0 ? (
        <p>No jobs or internships available for this company.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link href="/">
          <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300">
            ⬅ Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
