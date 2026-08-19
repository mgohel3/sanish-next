import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "default" | "glass";
type Size = "sm" | "md";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  "aria-label": string;
  children: ReactNode;
}

type IconButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type IconButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type IconButtonProps = IconButtonAsButton | IconButtonAsLink;

/**
 * Shared circular icon button — arrows, search, close, socials. Same size,
 * border, and hover-fill everywhere (`.btn-icon` in globals.css); `variant`
 * only swaps in the glass treatment for buttons on dark/photo backgrounds.
 */
export default function IconButton({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...rest
}: IconButtonProps) {
  const classes = [
    "btn-icon",
    variant === "glass" ? "btn-icon-glass" : "",
    size === "sm" ? "btn-icon-sm" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
