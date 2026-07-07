"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import {
  getCurriculumResources,
  getGrades,
  getSubjects,
  resourceTypes,
  type Level,
} from "../../lib/curriculum";
import { CoverageMap } from "./coverage-map";
import { CurriculumResourceList } from "./curriculum-resource-list";
import { CurriculumSidebar, type CurriculumFilters } from "./curriculum-sidebar";

type ViewMode = "map" | "list";

const emptyFilters: CurriculumFilters = { type: null, subjectId: null, gradeId: null, query: "" };

const levelTabs: { value: Level; label: string }[] = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
];

/**
 * Owns all filtering state for the Curriculum Index (level, view mode,
 * active filters, filter-pane visibility) and wires the sidebar, tab bar,
 * search box, coverage map, and resource list together. `resources/page.tsx`
 * renders this as the sole stateful piece of the page — it stays a server
 * component (so it can still export `metadata`) and delegates interactivity
 * here.
 */
export function CurriculumExplorer() {
  const [level, setLevel] = useState<Level>("primary");
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [filters, setFilters] = useState<CurriculumFilters>(emptyFilters);
  const [showFilters, setShowFilters] = useState(true);

  const subjects = useMemo(() => getSubjects(level), [level]);
  const grades = useMemo(() => getGrades(level), [level]);

  const filteredResources = useMemo(
    () => getCurriculumResources({ level, ...filters }),
    [level, filters]
  );

  function handleLevelChange(next: Level) {
    setLevel(next);
    setFilters(emptyFilters);
    setViewMode("map");
  }

  function handleFilterChange(patch: Partial<CurriculumFilters>) {
    setFilters((f) => ({ ...f, ...patch }));
    setViewMode("list");
  }

  function handleCellClick(subjectId: string, gradeId: string) {
    setFilters({ type: null, subjectId, gradeId, query: "" });
    setViewMode("list");
  }

  function handleBackToMap() {
    setFilters(emptyFilters);
    setViewMode("map");
  }

  const activeSubject = subjects.find((s) => s.id === filters.subjectId);
  const activeGrade = grades.find((g) => g.id === filters.gradeId);

  return (
    <div className="mx-auto flex w-full max-w-8xl flex-col gap-8 px-6 py-12 lg:flex-row">
      {showFilters && (
        <CurriculumSidebar
          resourceTypes={resourceTypes}
          subjects={subjects}
          grades={grades}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={() => setFilters(emptyFilters)}
        />
      )}

      <div className="min-w-0 flex-1">
        {/* level tabs + filter pane toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border">
          <div role="tablist" aria-label="Curriculum level" className="flex gap-1">
            {levelTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={level === tab.value}
                onClick={() => handleLevelChange(tab.value)}
                className={cn(
                  "-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  level === tab.value
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowFilters((s) => !s)}
            aria-expanded={showFilters}
            aria-controls="curriculum-filters-panel"
          >
            <Icon name="filter" className="h-4 w-4" />
            {showFilters ? "Hide filters" : "Show filters"}
          </Button>
        </div>

        <div className="mt-6">
          {/* intro / back button (left) + search (right) */}
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              {viewMode === "map" ? (
                <p className="text-[15px] text-muted">
                  Coverage across every subject and {level === "primary" ? "year" : "form"} level.
                  Select a number to see the resources published for that subject and grade.
                </p>
              ) : (
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="secondary" size="sm" onClick={handleBackToMap}>
                    <Icon name="arrow" className="h-4 w-4 rotate-180" />
                    Back to Coverage Map
                  </Button>
                  <p className="text-sm text-muted" aria-live="polite">
                    {filteredResources.length} {filteredResources.length === 1 ? "resource" : "resources"}
                    {activeSubject && <> · {activeSubject.name}</>}
                    {activeGrade && <> · {activeGrade.label}</>}
                    {filters.type && <> · {filters.type}</>}
                    {filters.query && <> · &ldquo;{filters.query}&rdquo;</>}
                  </p>
                </div>
              )}
            </div>

            <div className="relative sm:w-72 sm:shrink-0">
              <Icon
                name="search"
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted"
              />
              <input
                type="search"
                value={filters.query}
                onChange={(e) => handleFilterChange({ query: e.target.value })}
                placeholder="Search resources…"
                aria-label="Search curriculum resources"
                className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          {viewMode === "map" ? (
            <CoverageMap
              subjects={subjects}
              grades={grades}
              countFor={(subjectId, gradeId) =>
                getCurriculumResources({ level, subjectId, gradeId }).length
              }
              onCellClick={handleCellClick}
            />
          ) : (
            <CurriculumResourceList resources={filteredResources} subjects={subjects} grades={grades} />
          )}
        </div>
      </div>
    </div>
  );
}
