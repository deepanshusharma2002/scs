"use client";

import { useState } from "react";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function OpeningsList({ openings }) {
  const teams = ["All teams", ...new Set(openings.map((job) => job.team))];
  const locations = ["All locations", ...new Set(openings.map((job) => job.location))];
  const [team, setTeam] = useState(teams[0]);
  const [location, setLocation] = useState(locations[0]);
  const visible = openings.filter(
    (job) => (team === teams[0] || job.team === team) && (location === locations[0] || job.location === location),
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by team">
          {teams.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={team === value}
              onClick={() => setTeam(value)}
              className={cn(
                "h-9 cursor-pointer rounded-lg border px-3 text-sm font-medium transition-colors",
                team === value ? "border-navy-900 bg-navy-900 text-white" : "border-navy-900/10 bg-white text-navy-700 hover:border-navy-900/25",
              )}
            >
              {value}
            </button>
          ))}
        </div>
        <label className="ml-auto flex items-center gap-2 text-sm text-navy-600">
          <MapPin className="size-4" aria-hidden />
          <span className="sr-only">Location</span>
          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="h-9 rounded-lg border border-navy-900/10 bg-white px-2.5 text-sm text-navy-800 outline-none focus:border-azure-500"
          >
            {locations.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-6 font-mono text-xs text-navy-500" aria-live="polite">
        {visible.length} open {visible.length === 1 ? "role" : "roles"}
      </p>
      <ul className="mt-3 divide-y divide-navy-900/8 overflow-hidden rounded-xl border border-navy-900/10 bg-white">
        {visible.map((job) => (
          <li key={job.title}>
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
              className="group flex flex-col gap-3 p-6 transition-colors hover:bg-azure-50/50 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-display text-lg font-bold text-navy-950 group-hover:text-azure-700">{job.title}</p>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-navy-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="size-4" aria-hidden /> {job.team}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4" aria-hidden /> {job.location}
                  </span>
                  <span className="font-mono text-xs leading-5 uppercase">{job.type}</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-azure-600">
                Apply now <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </span>
            </a>
          </li>
        ))}
        {visible.length === 0 && <li className="p-10 text-center text-navy-500">No roles match those filters right now.</li>}
      </ul>
    </div>
  );
}
