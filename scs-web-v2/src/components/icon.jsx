import { icons } from "@/lib/icons";

export function Icon({ name, ...props }) {
  const Component = icons[name] ?? icons.sparkles;
  return <Component aria-hidden {...props} />;
}
