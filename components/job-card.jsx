"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function JobCard({ job }) {
  const maxSkillsToShow = 3;
  const maxPerksToShow = 3;

  const visibleSkills = job?.skillsRequired?.slice(0, maxSkillsToShow) || [];
  const visiblePerks = job?.perks?.slice(0, maxPerksToShow) || [];

  return (
    <Card className="w-full shadow-md hover:shadow-lg transition duration-300 max-w-md rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{job?.jobProfile}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {job?.companyName} • {job?.location}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div className="text-muted-foreground">
          <strong>Type:</strong> {job?.type} &nbsp;&nbsp;|&nbsp;&nbsp;
          <strong>Salary:</strong> ₹{job?.salaryMin}K - ₹{job?.salaryMax}K &nbsp;&nbsp;|&nbsp;&nbsp;
          <strong>Hours:</strong> {job?.workingHours}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {visibleSkills.map((skill, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job?.skillsRequired?.length > maxSkillsToShow && (
            <span className="text-xs text-muted-foreground">
              +{job.skillsRequired.length - maxSkillsToShow} more
            </span>
          )}
        </div>

        {/* Perks */}
        <div className="flex flex-wrap gap-2">
          {visiblePerks.map((perk, i) => (
            <Badge
              key={i}
              className="bg-green-400 text-green-900 text-xs"
              variant="secondary"
            >
              {perk}
            </Badge>
          ))}
          {job?.perks?.length > maxPerksToShow && (
            <span className="text-xs text-muted-foreground">
              +{job.perks.length - maxPerksToShow} more
            </span>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          <strong>Duration:</strong> {job?.duration || "N/A"}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button asChild>
          <Link href={`/jobs/${job?.id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
