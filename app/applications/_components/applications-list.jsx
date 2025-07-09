"use client";

import {
  Briefcase,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  BadgeCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";

export function ApplicationsList({ initialData }) {
  if (!initialData || initialData.length === 0) {
    return (
      <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-400 mt-6 font-light">
        You have not applied to any jobs yet.
      </p>
    );
  }

  const getStatus = (status) => {
    switch (status?.toUpperCase()) {
      case "HIRED":
        return {
          text: "Hired",
          color: "text-green-500",
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        };
      case "REJECTED":
        return {
          text: "Rejected",
          color: "text-red-500",
          icon: <XCircle className="w-5 h-5 text-red-500" />,
        };
      case "PENDING":
        return {
          text: "Pending",
          color: "text-yellow-500",
          icon: <Clock className="w-5 h-5 text-yellow-500" />,
        };
      case "SHORTLISTED":
        return {
          text: "Shortlisted",
          color: "text-blue-500",
          icon: <BadgeCheck className="w-5 h-5 text-blue-500" />,
        };
      default:
        return {
          text: "Unknown",
          color: "text-gray-400",
          icon: null,
        };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {initialData.map((application) => {
        const statusInfo = getStatus(application.status);
        const job = application.job;

        return (
          <Card
            key={application.id}
            className="bg-zinc-900 border border-zinc-800 hover:border-blue-600 transition-all duration-200 shadow-md rounded-2xl p-4"
          >
            <CardContent className="p-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">
                    {job.jobProfile}
                  </h3>
                  <div
                    className={clsx(
                      "flex items-center gap-1 text-sm font-medium",
                      statusInfo.color
                    )}
                  >
                    {statusInfo.icon}
                    {statusInfo.text}
                  </div>
                </div>

                <div className="flex items-center text-gray-400 text-sm gap-2">
                  <Briefcase className="w-4 h-4" />
                  {job.companyName}
                </div>

                <div className="flex items-center text-gray-400 text-sm gap-2">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
