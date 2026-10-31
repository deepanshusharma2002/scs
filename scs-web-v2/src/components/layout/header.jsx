"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { Logo } from "@/components/brand/logo";
import { Icon } from "@/components/icon";
import { CommandSearch } from "@/components/layout/command-search";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ButtonLink } from "@/components/ui/button";
import { mainNav } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [focusPanel, setFocusPanel] = useState(false);
  const closeTimer = useRef(null);
  const triggers = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(null);
        setSearchOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onEscape = (event) => {
      if (event.key !== "Escape") return;
      triggers.current[open]?.focus();
      setOpen(null);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open]);

  const cancelClose = () => clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };
  const active = mainNav.find((item) => item.title === open);
  const solid = scrolled || Boolean(active);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        solid
          ? "border-b border-navy-900/8 bg-white/90 shadow-[0_1px_0_rgb(11_21_48/0.02)] backdrop-blur-xl"
          : "border-b border-transparent bg-paper/0",
      )}
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
    >
      <div className="container-x flex h-16 items-center gap-6 lg:h-18">
        <Link href="/" className="shrink-0" aria-label="3SC home" onClick={() => setOpen(null)}>
          <Logo className="h-7 lg:h-8" />
        </Link>

        <nav aria-label="Main" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) => {
              const isOpen = open === item.title;
              return (
                <li key={item.title}>
                  <button
                    ref={(element) => {
                      triggers.current[item.title] = element;
                    }}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls="mega-panel"
                    onMouseEnter={() => {
                      cancelClose();
                      setFocusPanel(false);
                      setOpen(item.title);
                    }}
                    onClick={(event) => {
                      setFocusPanel(event.detail === 0);
                      setOpen(isOpen ? null : item.title);
                    }}
                    className={cn(
                      "flex h-10 cursor-pointer items-center gap-1 rounded-md px-3 text-[0.9375rem] font-medium transition-colors",
                      isOpen ? "bg-navy-900/5 text-navy-950" : "text-navy-700 hover:text-navy-950",
                    )}
                  >
                    {item.title}
                    <ChevronDown
                      className={cn("size-3.5 opacity-60 transition-transform", isOpen && "rotate-180")}
                      aria-hidden
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOpen(null);
              setSearchOpen(true);
            }}
            className="hidden h-10 cursor-pointer items-center gap-2 rounded-lg border border-navy-900/10 bg-white/70 pr-2 pl-3 text-sm text-navy-500 transition-colors hover:border-navy-900/20 hover:text-navy-800 md:flex"
            aria-label="Search the site"
          >
            <Search className="size-4" aria-hidden />
            <span className="hidden xl:inline">Search</span>
            <kbd className="rounded border border-navy-900/10 bg-navy-50 px-1.5 font-mono text-[0.6875rem] text-navy-500">
              Ctrl K
            </kbd>
          </button>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="grid size-10 cursor-pointer place-items-center rounded-lg text-navy-700 hover:bg-navy-900/5 md:hidden"
            aria-label="Search the site"
          >
            <Search className="size-5" aria-hidden />
          </button>
          <ButtonLink href={siteConfig.demoHref} size="sm" className="hidden h-10 sm:inline-flex">
            Book a demo <ArrowRight />
          </ButtonLink>
          <MobileNav />
        </div>
      </div>

      {active && (
        <MegaPanel
          key={active.title}
          item={active}
          autoFocus={focusPanel}
          onNavigate={() => setOpen(null)}
        />
      )}

      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}

function MegaPanel({ item, autoFocus, onNavigate }) {
  const [tabId, setTabId] = useState(item.tabs[0].id);
  const panelRef = useRef(null);

  useEffect(() => {
    if (autoFocus) panelRef.current?.querySelector("a[href], button")?.focus();
  }, [autoFocus]);
  const tab = item.tabs.find((entry) => entry.id === tabId) ?? item.tabs[0];
  const tabbed = item.tabs.length > 1;
  const columns = Math.min(tab.groups.length, tabbed ? 2 : 4);

  return (
    <div
      id="mega-panel"
      ref={panelRef}
      className="absolute inset-x-0 top-full hidden border-b border-navy-900/8 bg-white shadow-[0_30px_60px_-30px_rgb(11_21_48/0.25)] lg:block"
      onClick={(event) => {
        if (event.target.closest("a")) onNavigate();
      }}
    >
      <div className="container-x grid animate-panel-in grid-cols-12 gap-8 py-8">
        {tabbed && (
          <div className="col-span-3 border-r border-navy-900/8 pr-6" role="tablist" aria-orientation="vertical">
            {item.tabs.map((entry, index) => {
              const selected = entry.id === tab.id;
              const showFamily = entry.family && entry.family !== item.tabs[index - 1]?.family;
              return (
                <div key={entry.id}>
                  {showFamily && (
                    <p className={cn("kicker mb-2 text-navy-400", index > 0 && "mt-5")}>{entry.family}</p>
                  )}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onMouseEnter={() => setTabId(entry.id)}
                    onFocus={() => setTabId(entry.id)}
                    onClick={() => setTabId(entry.id)}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors",
                      selected ? "bg-azure-50 text-azure-700" : "text-navy-700 hover:bg-navy-50",
                    )}
                  >
                    {entry.icon && <Icon name={entry.icon} className="size-4 shrink-0" />}
                    {entry.label}
                    <ArrowRight
                      className={cn("ml-auto size-3.5 transition-opacity", selected ? "opacity-100" : "opacity-0")}
                      aria-hidden
                    />
                  </button>
                </div>
              );
            })}
            {item.footerLinks && (
              <ul className="mt-6 space-y-1 border-t border-navy-900/8 pt-4">
                {item.footerLinks.map((entry) => (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-navy-600 hover:text-azure-700"
                    >
                      {entry.title} <ArrowUpRight className="size-3.5" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className={cn(tabbed ? "col-span-6" : "col-span-9")} role={tabbed ? "tabpanel" : undefined}>
          {tabbed && (
            <div className="mb-6 flex items-start justify-between gap-6">
              <div>
                <Link
                  href={tab.href}
                  className="group inline-flex items-center gap-2 font-display text-lg font-bold text-navy-950 hover:text-azure-700"
                >
                  {tab.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
                {tab.summary && <p className="mt-1 max-w-lg text-sm text-navy-500">{tab.summary}</p>}
              </div>
            </div>
          )}
          <div
            className="grid gap-x-8 gap-y-6"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {tab.groups.map((group, index) => (
              <div key={group.heading ?? index}>
                {group.heading &&
                  (group.href ? (
                    <Link href={group.href} className="kicker mb-3 text-navy-400 hover:text-azure-700">
                      {group.heading}
                    </Link>
                  ) : (
                    <p className="kicker mb-3 text-navy-400">{group.heading}</p>
                  ))}
                <ul
                  className={cn(
                    "grid gap-0.5",
                    !tabbed && tab.groups.length === 1 && "grid-cols-2 gap-x-6 xl:grid-cols-3",
                  )}
                >
                  {group.links.map((entry) => (
                    <li key={entry.href}>
                      <Link
                        href={entry.href}
                        className="group flex items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-navy-50"
                      >
                        {entry.icon && (
                          <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md border border-navy-900/8 bg-white text-navy-500 transition-colors group-hover:border-azure-500/30 group-hover:text-azure-600">
                            <Icon name={entry.icon} className="size-3.5" />
                          </span>
                        )}
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-navy-800 group-hover:text-navy-950">
                            {entry.title}
                          </span>
                          {entry.description && (
                            <span className="mt-0.5 line-clamp-2 block text-xs text-navy-500">
                              {entry.description}
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <FeaturedCard featured={item.featured} />
      </div>
    </div>
  );
}

function FeaturedCard({ featured }) {
  if (!featured) return null;
  return (
    <Link
      href={featured.href}
      className="group relative col-span-3 flex flex-col overflow-hidden rounded-xl bg-navy-950 p-6 text-white"
    >
      <div className="absolute inset-0 bg-deep" aria-hidden />
      <div className="absolute inset-0 bg-blueprint-dark opacity-60" aria-hidden />
      {featured.image && (
        <div className="relative -mx-6 -mt-6 mb-5 aspect-[16/9] overflow-hidden">
          <Image
            src={featured.image}
            alt=""
            fill
            sizes="320px"
            className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <p className="kicker relative text-cyan-300">{featured.kicker}</p>
      <p className="relative mt-3 font-display text-lg leading-snug font-bold">{featured.title}</p>
      <p className="relative mt-2 line-clamp-3 text-sm text-white/65">{featured.description}</p>
      <span className="relative mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-cyan-300">
        {featured.cta}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}
