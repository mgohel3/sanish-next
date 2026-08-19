import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "light" | "glass";
type Size = "sm" | "md" | "lg";

const variantClass: Record<Variant, string> = {
  primary: "btn-pill-primary",
  ghost: "btn-pill-ghost",
  light: "btn-pill-light",
  glass: "btn-pill-glass",
};

const sizeClass: Record<Size, string> = {
  sm: "btn-pill-sm",
  md: "",
  lg: "btn-pill-lg",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * The one CTA button used site-wide. Renders `.btn-pill` (globals.css) so
 * every button shares the same font, tracking, radius, and hover motion —
 * `variant` only changes color/background, never shape or type.
 */
export default function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    "btn-pill",
    variantClass[variant],
    sizeClass[size],
    fullWidth ? "w-full justify-center" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && iconPosition === "left" ? icon : null}
      {children}
      {icon && iconPosition === "right" ? icon : null}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
