import { icons } from "@/lib/icons";

export function Icon({ name, className }) {
  const Component = icons[name ?? "sparkles"];
  return <Component className={className} aria-hidden />;
}
