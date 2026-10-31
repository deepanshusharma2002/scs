"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavigationMenu } from "radix-ui";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Icon } from "@/components/icon";
import { ButtonLink } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mainNav } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

const columnClass = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-ink-900/10 bg-white shadow-[0_8px_30px_-12px_rgb(10_10_10/0.18)]"
          : "border-b border-transparent bg-white/80 backdrop-blur-md",
      )}
    >
      <div className="container-x flex h-18 items-center justify-between gap-6">
        <Link href="/" aria-label="3SC home" className="shrink-0">
          <Logo className="h-8" />
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-2">
          <Link
            href="/contact-us"
            className="hidden px-3 text-sm font-semibold text-ink-900 transition-colors hover:text-brand-500 xl:inline"
          >
            Contact us
          </Link>
          <ButtonLink href={siteConfig.demoHref} size="sm" className="hidden sm:inline-flex">
            Request a Demo
          </ButtonLink>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="grid size-11 cursor-pointer place-items-center rounded-full text-ink-900 hover:bg-ink-50 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent aria-describedby={undefined}>
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <MobileNav onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function DesktopNav() {
  return (
    <NavigationMenu.Root className="relative hidden flex-1 justify-center lg:flex">
      <NavigationMenu.List className="flex items-center gap-0.5">
        {mainNav.map((item) => (
          <NavigationMenu.Item key={item.title}>
            <NavigationMenu.Trigger className="group flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-2 text-[13px] font-semibold whitespace-nowrap xl:px-3.5 xl:text-sm text-ink-900 transition-colors hover:text-brand-500 data-[state=open]:text-brand-500">
              {item.title}
              <ChevronDown
                className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="w-full data-[state=open]:animate-[menu-in_180ms_ease-out]">
              <MegaPanel item={item} />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      <div className="fixed inset-x-0 top-18 flex justify-center">
        <NavigationMenu.Viewport className="relative h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden border-y border-ink-900/10 bg-white shadow-[0_30px_60px_-20px_rgb(10_10_10/0.25)] transition-[height] duration-200" />
      </div>
    </NavigationMenu.Root>
  );
}

function MegaPanel({ item }) {
  return (
    <div className="container-x grid grid-cols-12 gap-10 py-10">
      <div className={cn(item.featured ? "col-span-9" : "col-span-12")}>
        <div className="mb-6 flex items-center justify-between">
          <p className="eyebrow">{item.title}</p>
          <NavigationMenu.Link asChild>
            <Link
              href={item.href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-500"
            >
              View all <ArrowRight className="size-4" />
            </Link>
          </NavigationMenu.Link>
        </div>

        <div className={cn("grid gap-x-8 gap-y-6", columnClass[item.columns])}>
          {item.groups.map((group, index) =>
            group.title ? (
              <div key={group.title ?? index} className="min-w-0">
                <p className="mb-3 h-4 text-[11px] font-semibold tracking-[0.14em] text-ink-400 uppercase">
                  {group.eyebrow}
                </p>
                <NavigationMenu.Link asChild>
                  <Link
                    href={group.href}
                    className="mb-3 flex items-center gap-1 border-b border-ink-900/10 pb-3 font-semibold text-ink-900 hover:text-brand-500"
                  >
                    {group.title}
                    <ArrowUpRight className="size-3.5 opacity-60" />
                  </Link>
                </NavigationMenu.Link>
                <ul className="space-y-1">
                  {group.links.map((menuLink) => (
                    <li key={menuLink.href}>
                      <NavigationMenu.Link asChild>
                        <Link
                          href={menuLink.href}
                          className={cn(
                            "block rounded-lg py-1.5 text-sm transition-colors hover:text-brand-500",
                            menuLink.icon
                              ? "font-medium text-ink-800"
                              : "border-l border-ink-900/10 pl-3 text-ink-500",
                          )}
                        >
                          {menuLink.title}
                        </Link>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <ul key={index} className={cn("col-span-full grid gap-2", columnClass[item.columns])}>
                {group.links.map((menuLink) => (
                  <li key={menuLink.href}>
                    <NavigationMenu.Link asChild>
                      <Link
                        href={menuLink.href}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-ink-50"
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                          <Icon name={menuLink.icon} className="size-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-ink-900">
                            {menuLink.title}
                          </span>
                          {item.withDescriptions && menuLink.description && (
                            <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-ink-500">
                              {menuLink.description}
                            </span>
                          )}
                        </span>
                      </Link>
                    </NavigationMenu.Link>
                  </li>
                ))}
              </ul>
            ),
          )}
        </div>
      </div>

      {item.featured && (
        <NavigationMenu.Link asChild>
          <Link
            href={item.featured.href}
            className="group relative col-span-3 flex flex-col justify-end overflow-hidden rounded-2xl bg-ember p-6 text-white"
          >
            {item.featured.image ? (
              <Image
                src={item.featured.image}
                alt=""
                fill
                sizes="320px"
                className="object-cover opacity-40 transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-grid" aria-hidden />
            )}
            <div
              className="absolute -top-16 -right-16 size-48 rounded-full bg-brand-500/40 blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <p className="text-xs font-semibold tracking-[0.14em] text-brand-300 uppercase">
                {item.featured.eyebrow}
              </p>
              <p className="mt-2 text-lg leading-snug font-semibold">{item.featured.title}</p>
              <p className="mt-2 line-clamp-3 text-sm text-white/70">{item.featured.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300">
                {item.featured.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </NavigationMenu.Link>
      )}
    </div>
  );
}

function MobileNav({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-18 shrink-0 items-center border-b border-ink-900/10 px-6">
        <Link href="/" onClick={onNavigate} aria-label="3SC home">
          <Logo className="h-7" />
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-6">
        <Accordion type="single" collapsible>
          {mainNav.map((item) => (
            <AccordionItem key={item.title} value={item.title}>
              <AccordionTrigger className="py-4 text-base">{item.title}</AccordionTrigger>
              <AccordionContent className="pr-0 pb-4">
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500"
                >
                  View all {item.title.toLowerCase()} <ArrowRight className="size-4" />
                </Link>
                <div className="space-y-4">
                  {item.groups.map((group, index) => (
                    <div key={group.title ?? index}>
                      {group.title && (
                        <Link
                          href={group.href}
                          onClick={onNavigate}
                          className="mb-1 block text-sm font-semibold text-ink-900"
                        >
                          {group.eyebrow ? `${group.eyebrow} · ` : ""}
                          {group.title}
                        </Link>
                      )}
                      <ul>
                        {group.links.map((menuLink) => (
                          <li key={menuLink.href}>
                            <Link
                              href={menuLink.href}
                              onClick={onNavigate}
                              className={cn(
                                "block py-1.5 text-sm text-ink-700 hover:text-brand-500",
                                !menuLink.icon && "pl-3 text-ink-500",
                              )}
                            >
                              {menuLink.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Link
          href="/contact-us"
          onClick={onNavigate}
          className="block border-b border-ink-900/10 py-4 font-semibold text-ink-900"
        >
          Contact us
        </Link>
      </nav>
      <div className="shrink-0 border-t border-ink-900/10 p-6">
        <ButtonLink href={siteConfig.demoHref} onClick={onNavigate} className="w-full">
          Request a Demo
        </ButtonLink>
      </div>
    </div>
  );
}
