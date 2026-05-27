"use client";

import { useMemo, useState } from "react";
import { EditableMedia } from "@/components/cms-inline/editable-media";
import { EditableText } from "@/components/cms-inline/editable-text";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { PillarColorImage, type PillarTone } from "@/components/shared/pillar-color-image";
import { cn } from "@/lib/utils";

type TeamMemberSpotlightItem = {
  name: string;
  bio: string;
  quote: string;
};

type TeamMemberSpotlightProps = {
  divisionName: string;
  tone: PillarTone;
  members: TeamMemberSpotlightItem[];
  cmsPathPrefix?: string;
  mediaAspectClassName?: string;
  mediaCropAspect?: number;
};

export function TeamMemberSpotlight({
  divisionName,
  tone,
  members,
  cmsPathPrefix = "home.teamSpotlight",
  mediaAspectClassName = "aspect-[4/3]",
  mediaCropAspect = 4 / 3,
}: TeamMemberSpotlightProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMember = useMemo(() => members[activeIndex] ?? members[0], [activeIndex, members]);

  if (!activeMember) {
    return null;
  }

  return (
    <section className="border-b border-border bg-[#f6f3e8] py-14 sm:py-20">
      <Container className="space-y-10">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            badge="Our Team"
            title="Meet Our Expert Team"
            description={`The ${divisionName} division combines strategy, care, and practical execution to support people and communities.`}
            badgePath={`${cmsPathPrefix}.badge`}
            titlePath={`${cmsPathPrefix}.title`}
            descriptionPath={`${cmsPathPrefix}.description`}
            align="center"
            className="mx-auto"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={member.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`border p-5 text-center transition-all duration-200 ease-out ${
                  isActive
                    ? "border-[var(--hero-main)] bg-[var(--hero-main)]/5 scale-[1.01]"
                    : "border-border bg-white hover:scale-[1.01] hover:bg-muted/50"
                }`}
                aria-pressed={isActive}
              >
                <PillarColorImage tone={tone} className="mx-auto h-16 w-16 rounded-none" sizes="64px" />
                <h3 className="mt-3 font-display text-lg font-bold text-[var(--hero-black)]">
                  <EditableText path={`${cmsPathPrefix}.members.${index}.name`} fallback={member.name} />
                </h3>
              </button>
            );
          })}
        </div>

        <div className="grid items-center gap-8 border border-border bg-white/60 p-6 sm:p-8 lg:grid-cols-2">
          <div>
            <blockquote className="font-display text-2xl font-bold leading-tight tracking-tight text-[var(--hero-black)] sm:text-4xl">
              "
              <EditableText path={`${cmsPathPrefix}.members.${activeIndex}.quote`} fallback={activeMember.quote} />
              "
            </blockquote>
            <p className="mt-5 font-display text-lg font-bold text-[var(--hero-black)]">
              <EditableText path={`${cmsPathPrefix}.members.${activeIndex}.name`} fallback={activeMember.name} />
            </p>
            <p className="mt-4 font-serif text-base leading-7 text-[var(--hero-text)]">
              <EditableText path={`${cmsPathPrefix}.members.${activeIndex}.bio`} fallback={activeMember.bio} />
            </p>
          </div>
          <div className="w-full overflow-hidden border border-border">
            <div className="relative w-full overflow-hidden">
              <EditableMedia
                path={`${cmsPathPrefix}.members.${activeIndex}.photo`}
                type="image"
                emptyLabel="Team member image"
                className="h-full w-full"
                cropAspect={mediaCropAspect}
                frameClassName={cn("w-full", mediaAspectClassName)}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
