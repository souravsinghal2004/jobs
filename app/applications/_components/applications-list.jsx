"use client";

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import clsx from "clsx"; // Optional: You can use clsx for cleaner className logic

export function ApplicationsList({ initialData }) {
  if (!initialData || initialData.length === 0) {
    return <p className="text-muted-foreground">You have not applied to any jobs yet.</p>;
  }

  const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
      case "HIRED":
        return "text-green-600 font-semibold";
      case "REJECTED":
        return "text-red-600 font-semibold";
      case "PENDING":
        return "text-yellow-600 font-semibold";
      case "SHORTLISTED":
        return "text-green-700 bg-red-100 px-2 py-0.5 rounded font-semibold";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="grid gap-6">
      {initialData.map((application) => {
        const status = application.status || "PENDING";
        return (
          <Card key={application.id}>
            <CardContent className="p-4">
              <CardTitle className="text-xl font-semibold">{application.job.jobProfile}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {application.job.companyName} • {application.job.location}
              </CardDescription>
              <p className="text-sm mt-2">
                Status:{" "}
                <span className={getStatusClass(status)}>
                  {status}
                </span>
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
