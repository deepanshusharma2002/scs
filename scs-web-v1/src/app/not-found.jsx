import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { IsoStack } from "@/components/visuals/iso-stack";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 bg-dots [mask-image:radial-gradient(50%_60%_at_50%_40%,black,transparent)]" aria-hidden />
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <IsoStack icon="compass" className="mb-6 max-w-56" />
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 text-display font-bold text-ink-950">
          This route is <em className="accent text-gradient">off the map</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-600">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back
          on track.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg">
            Back to home <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/contact-us" variant="outline" size="lg">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
