"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";

type TeamMemberSpotlightItem = {
  name: string;
  role: string;
  bio: string;
  quote: string;
  image: string;
};

type TeamMemberSpotlightProps = {
  divisionName: string;
  members: TeamMemberSpotlightItem[];
};

export function TeamMemberSpotlight({ divisionName, members }: TeamMemberSpotlightProps) {
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
                className={`border p-5 text-center transition-colors ${
                  isActive ? "border-[var(--hero-main)] bg-[var(--hero-main)]/5" : "border-border bg-white hover:bg-muted/50"
                }`}
                aria-pressed={isActive}
              >
                <img src={member.image} alt={member.name} className="mx-auto h-14 w-14 rounded-none border border-border object-cover" />
                <h3 className="mt-3 font-display text-lg font-bold text-[var(--hero-black)]">{member.name}</h3>
                <p className="mt-1 font-serif text-sm font-bold text-[var(--hero-main)]">{member.role}</p>
              </button>
            );
          })}
        </div>

        <div className="grid items-center gap-8 border border-border bg-white/60 p-6 sm:p-8 lg:grid-cols-2">
          <div>
            <blockquote className="font-display text-2xl font-bold leading-tight tracking-tight text-[var(--hero-black)] sm:text-4xl">
              "{activeMember.quote}"
            </blockquote>
            <p className="mt-5 font-display text-lg font-bold text-[var(--hero-black)]">{activeMember.name}</p>
            <p className="mt-1 font-serif text-sm font-bold text-[var(--hero-text)]">
              {activeMember.role} · {divisionName} Team
            </p>
            <p className="mt-4 font-serif text-base leading-7 text-[var(--hero-text)]">{activeMember.bio}</p>
          </div>
          <div className="w-full overflow-hidden border border-border">
            <img
              src={activeMember.image}
              alt={`${activeMember.name} portrait`}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
