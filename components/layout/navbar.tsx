"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { NAVBAR_CTA, NAVIGATION_ITEMS } from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/site";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background text-foreground">
      <Container className="flex h-20 items-center justify-between gap-3 sm:gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt={`${SITE_CONFIG.name} logo`}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          {/* <span className="max-w-[calc(100%-4rem)] truncate text-base font-semibold tracking-tight sm:max-w-none sm:text-xl">
            {SITE_CONFIG.name}
          </span> */}
        </Link>

        

        <div className="hidden md:flex md:items-center md:gap-6">
          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg bg-background px-3 py-2 text-[15px] transition-colors hover:text-foreground",
                  isActive
                    ? "font-semibold text-foreground"
                    : "font-medium text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
          <Button asChild size="sm" className="min-h-11 rounded-full px-6">
            <Link href={NAVBAR_CTA.href}>{NAVBAR_CTA.label}</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild className="shrink-0 md:hidden">
            <Button variant="outline" size="icon" className="min-h-11 min-w-11">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="inset-y-0 left-0 h-dvh w-screen max-w-none border-l-0 bg-background px-4 pt-2 duration-300 ease-out">
            <SheetHeader className="px-1">
              <SheetTitle className="flex justify-center">
                <Image
                  src="/logo.png"
                  alt={`${SITE_CONFIG.name} logo`}
                  width={56}
                  height={56}
                  className="h-14 w-14 object-contain"
                />
              </SheetTitle>
            </SheetHeader>

            <nav aria-label="Mobile Primary" className="flex h-full flex-col justify-between px-1 pb-6">
              <div className="grid gap-2">
                {NAVIGATION_ITEMS.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "rounded-xl bg-background px-3 py-3 text-sm leading-5 transition-colors",
                          isActive
                            ? "font-medium text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>

              <SheetClose asChild>
                <Button asChild className="min-h-11 w-full rounded-none">
                  <Link href={NAVBAR_CTA.href}>{NAVBAR_CTA.label}</Link>
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
