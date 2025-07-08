"use server";

import { db } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

// ✅ Get all jobs
export async function getJobs() {
  return await db.job.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });
}

// ✅ Get jobs by type (JOB / INTERNSHIP)
export async function getJobsByType(type) {
  if (!type || (type !== "JOB" && type !== "INTERNSHIP")) {
    throw new Error("Invalid job type");
  }

  return await db.job.findMany({
    where: { type },
    orderBy: { createdAt: "desc" },
  });
}

// ✅ Get jobs by company name
export async function getJobsByCompany(companyName) {
  if (!companyName) throw new Error("Company name is required");

  return await db.job.findMany({
    where: { companyName },
    orderBy: { createdAt: "desc" },
  });
}

// ✅ JOBS filtered by location
export async function getJobsByLocation(location) {
  if (!location) throw new Error("Location is required");

  return await db.job.findMany({
    where: {
      location,
      type: "JOB",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// ✅ INTERNSHIPS filtered by location
export async function getInternshipsByLocation(location) {
  if (!location) throw new Error("Location is required");

  return await db.job.findMany({
    where: {
      location,
      type: "INTERNSHIP",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// ✅ JOBS filtered by pay range
export async function getJobsByPayRange(min, max) {
  return await db.job.findMany({
    where: {
      type: "JOB",
      salaryMin: { lte: max },
      salaryMax: { gte: min },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// ✅ INTERNSHIPS filtered by pay range
export async function getInternshipsByPayRange(min, max) {
  return await db.job.findMany({
    where: {
      type: "INTERNSHIP",
      salaryMin: { lte: max },
      salaryMax: { gte: min },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}


// ✅ Apply to a job (checks user + duplicates)
export async function applyToJob(jobId) {
  const { userId } = await auth();
  if (!userId) throw new Error("You must be logged in to apply");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error("User not found");

  const existing = await db.jobApplication.findFirst({
    where: {
      userId: user.id,
      jobId,
    },
  });

  if (existing) throw new Error("Already applied to this job");

  const application = await db.jobApplication.create({
    data: {
      userId: user.id,
      jobId,
      status: "PENDING",
    },
  });

  return application;
}

// ✅ Check if user already applied to a job
export async function hasUserApplied(jobId) {
  const { userId } = await auth(); // ✅ FIXED
  if (!userId) return false;

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) return false;

  const application = await db.jobApplication.findFirst({
    where: {
      userId: user.id,
      jobId,
    },
  });

  return !!application;
}

// ✅ Get application status for current user
export async function getJobApplicationStatus(jobId) {
  const { userId } = await auth(); // ✅ FIXED
  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) return null;

  const application = await db.jobApplication.findFirst({
    where: {
      userId: user.id,
      jobId,
    },
  });

  return application?.status ?? null;
}

// ✅ Get job details by ID
export async function getJobById(id) {
  try {
    const job = await db.job.findUnique({ where: { id } });

    if (!job) {
      return { success: false, error: "Job not found" };
    }

    return { success: true, data: job };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ✅ Get all applications made by current user
export async function getUserApplications() {
  const { userId } = await auth(); // ✅ FIXED

  if (!userId) return [];

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

 
  if (!user) return [];

  const applications = await db.jobApplication.findMany({
    where: { userId: user.id },
    include: { job: true },
    orderBy: { createdAt: "desc" },
  });

 
  return applications;
}

export async function getCompanyJobs(companyName) {
  return await prisma.job.findMany({
    where: {
      companyName: {
        equals: companyName,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}