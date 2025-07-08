"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { applyToJob, getJobApplicationStatus } from "@/actions/server";
import { toast } from "sonner";
import { UploadIcon, XIcon } from "lucide-react";

export function JobDetails({ job }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await getJobApplicationStatus(job.id);
        if (status === "PENDING" || status === "HIRED") {
          setHasApplied(true);
        }
      } catch (error) {
        console.error("Failed to fetch status:", error);
      }
    };
    fetchStatus();
  }, [job.id]);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    setResumeFile(file);
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
    fileInputRef.current.value = "";
  };

  const handleApply = async () => {
    if (!resumeFile) {
      toast.warning("Please upload your resume before applying");
      return;
    }

    setIsApplying(true);
    try {
      await applyToJob(job.id);
      setHasApplied(true);
      toast.success("Applied successfully!");
    } catch (error) {
      toast.error(error?.message || "Application failed");
    } finally {
      setIsApplying(false);
    }
  };

  const disabled = !resumeFile || hasApplied || isApplying;

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 space-y-10 text-white">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold tracking-tight text-blue-400">
            {job.jobProfile}
          </CardTitle>

          <div className="mt-2">
            <h2 className="text-sm font-medium text-muted-foreground mb-1 uppercase">
              Company & Location
            </h2>
            <p className="text-lg font-semibold text-gray-200">
              <span className="text-sky-400">{job.companyName}</span>
              <span className="text-gray-400"> • {job.location}</span>
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="grid grid-cols-2 gap-6 text-sm text-gray-400">
            <div><strong>Type:</strong> {job.type}</div>
            <div><strong>Working Hours:</strong> {job.workingHours}</div>
            <div><strong>Salary:</strong> ₹{job.salaryMin}K – ₹{job.salaryMax}K</div>
            {job.duration && <div><strong>Duration:</strong> {job.duration}</div>}
          </div>

          <div>
            <h2 className="font-semibold mb-2 text-lg text-white">Required Skills</h2>
            <div className="flex flex-wrap gap-3">
              {job.skillsRequired.map((skill, i) => (
                <Badge key={i} variant="outline" className="border-blue-400 text-blue-300">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {job.perks?.length > 0 && (
            <div>
              <h2 className="font-semibold mb-2 text-lg text-white">Perks</h2>
              <div className="flex flex-wrap gap-3">
                {job.perks.map((perk, i) => (
                  <Badge key={i} className="bg-green-400 text-green-900" variant="secondary">
                    {perk}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {job.aboutCompany && (
            <div>
              <h2 className="font-semibold mb-2 text-lg text-blue-400">About Company</h2>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-400">
                {job.aboutCompany.split(". ").map((point, index) => (
                  point && <li key={index}>{point.trim()}.</li>
                ))}
              </ul>
            </div>
          )}

          {job.jobDescription && (
            <div>
              <h2 className="font-semibold mb-2 text-lg text-blue-400">Job Description</h2>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-400">
                {job.jobDescription.split(". ").map((point, index) => (
                  point && <li key={index}>{point.trim()}.</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-3">
            <label className="font-semibold block">Upload Resume (PDF only)</label>
            <div className="flex items-center gap-2">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-gray-600 rounded-md cursor-pointer p-6 text-center hover:bg-zinc-800 transition duration-200 w-full"
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-sm text-gray-400">
                    Drag & drop or click to upload resume (PDF only)
                  </p>
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  ref={fileInputRef}
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </div>
            </div>

            {resumeFile && (
              <Alert className="flex items-center justify-between bg-zinc-800 text-gray-300">
                <div>
                  <AlertTitle className="truncate font-medium text-sm">
                    {resumeFile.name}
                  </AlertTitle>
                  <AlertDescription className="text-xs">
                    Resume ready for submission
                  </AlertDescription>
                </div>
                <Button size="icon" variant="ghost" onClick={handleRemoveResume}>
                  <XIcon className="w-4 h-4 text-red-500" />
                </Button>
              </Alert>
            )}
          </div>

          <div>
            <Button
              onClick={handleApply}
              disabled={disabled}
              className={
                disabled
                  ? "bg-zinc-600 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }
            >
              {hasApplied ? "Already Applied" : isApplying ? "Applying..." : "Apply Now"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
