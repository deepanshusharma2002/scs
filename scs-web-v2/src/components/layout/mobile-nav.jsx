"use client";

import { useState } from "react";
import Link from "next/link";
import { Dialog } from "radix-ui";
import { ArrowRight, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Icon } from "@/components/icon";
import { ButtonLink } from "@/components/ui/button";
import { mainNav } from "@/content/navigation";
import { siteConfig } from "@/content/site";

/** Full-screen drill-down navigation: level one lists sections, level two shows every link in it. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState(null);
  const item = mainNav.find((entry) => entry.title === level);

  const close = () => {
    setOpen(false);
    setLevel(null);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => (value ? setOpen(true) : close())}
    >
      <Dialog.Trigger
        className="grid size-10 cursor-pointer place-items-center rounded-lg text-navy-800 hover:bg-navy-900/5 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" aria-hidden />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          data-lenis-prevent
          className="fixed inset-0 z-[70] flex animate-fade-in flex-col bg-white lg:hidden"
          onClick={(event) => {
            if (event.target.closest("a")) close();
          }}
        >
          <Dialog.Title className="sr-only">Site menu</Dialog.Title>
          <Dialog.Description className="sr-only">Browse every section of the 3SC site.</Dialog.Description>
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-navy-900/8 px-5">
            {item ? (
              <button
                type="button"
                onClick={() => setLevel(null)}
                className="-ml-2 flex cursor-pointer items-center gap-1 rounded-md px-2 py-1.5 text-sm font-semibold text-navy-700"
              >
                <ChevronLeft className="size-4" aria-hidden /> Menu
              </button>
            ) : (
              <Logo className="h-7" />
            )}
            <Dialog.Close
              className="grid size-10 cursor-pointer place-items-center rounded-lg text-navy-800 hover:bg-navy-50"
              aria-label="Close menu"
            >
              <X className="size-5" aria-hidden />
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {!item && (
              <ul className="divide-y divide-navy-900/8">
                {mainNav.map((entry) => (
                  <li key={entry.title}>
                    <button
                      type="button"
                      onClick={() => setLevel(entry.title)}
                      className="flex w-full cursor-pointer items-center justify-between py-4 font-display text-xl font-bold text-navy-950"
                    >
                      {entry.title}
                      <ChevronRight className="size-5 text-navy-400" aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {item && (
              <div key={item.title} className="animate-slide-up">
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-xl bg-navy-50 px-4 py-3 font-display text-lg font-bold text-navy-950"
                >
                  {item.title} overview <ArrowRight className="size-4" aria-hidden />
                </Link>
                {item.tabs.map((tab) => (
                  <section key={tab.id} className="mt-6">
                    {item.tabs.length > 1 && (
                      <Link
                        href={tab.href}
                        className="flex items-center gap-2 font-display text-base font-bold text-navy-900"
                      >
                        {tab.icon && <Icon name={tab.icon} className="size-4 text-azure-600" />}
                        {tab.label}
                        {tab.family && (
                          <span className="font-mono text-[0.625rem] font-medium tracking-wide text-navy-400 uppercase">
                            {tab.family}
                          </span>
                        )}
                      </Link>
                    )}
                    {tab.groups.map((group, index) => (
                      <div key={group.heading ?? index} className="mt-3">
                        {group.heading && <p className="kicker mb-1 text-navy-400">{group.heading}</p>}
                        <ul className="grid gap-0.5 sm:grid-cols-2">
                          {group.links.map((entry) => (
                            <li key={entry.href}>
                              <Link
                                href={entry.href}
                                className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-[0.9375rem] text-navy-700 active:bg-navy-50"
                              >
                                {entry.icon && <Icon name={entry.icon} className="size-4 shrink-0 text-navy-400" />}
                                {entry.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </section>
                ))}
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-navy-900/8 p-5">
            <ButtonLink href={siteConfig.demoHref} className="w-full" size="lg">
              Book a demo <ArrowRight />
            </ButtonLink>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
