import { brandIcons } from "@/data/brandIcons";

type BrandIconProps = {
  icon: string;
  className?: string;
};

export function BrandIcon({ icon, className }: BrandIconProps) {
  const path = brandIcons[icon];
  if (!path) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} fill="currentColor" />
    </svg>
  );
}
