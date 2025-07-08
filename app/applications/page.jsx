import { getUserApplications } from "@/actions/server";
import { auth } from "@clerk/nextjs/server";
import { ApplicationsList } from "./_components/applications-list";


export default async function ApplicationsPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in?redirect=/applications");
  }

const applicationsResult = await getUserApplications();



  return (
    <div className="container mx-auto px-4 py-12">
     <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 mb-8 text-center">
  Your Applications
</h1>

      <ApplicationsList initialData={applicationsResult} />
    </div>
  );
}
