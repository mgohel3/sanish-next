const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.sapphirewoods.loyalty&hl=en_IN";
const APP_STORE_URL = "https://apps.apple.com/us/app/srewards/id6758007860";

const PlayStoreIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.5 21.5L11 11L0.5 0.5C0.2 0.8 0 1.2 0 1.7V20.3C0 20.8 0.2 21.2 0.5 21.5Z" fill="#EA4335" />
    <path d="M0.5 0.5L11 11L15.5 6.5L2 0C1.4-0.3 0.8-0.1 0.5 0.5Z" fill="#4FC3F7" />
    <path d="M0.5 21.5L11 11L15.5 15.5L2 22C1.4 22.3 0.8 22.1 0.5 21.5Z" fill="#4CAF50" />
    <path d="M19 12.9L15.5 15.5L11 11L15.5 6.5L19 9.1C19.9 9.6 20 10.4 20 11C20 11.6 19.9 12.4 19 12.9Z" fill="#FFCA28" />
  </svg>
);

const AppStoreIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size * 0.87} height={size * 1.1} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.41-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zm3.415-3.113c.83-1.012 1.39-2.42 1.234-3.821-1.196.052-2.638.796-3.494 1.807-.767.9-1.442 2.35-1.26 3.71 1.338.104 2.687-.68 3.52-1.696z" />
  </svg>
);

type Size = "sm" | "md" | "lg";
type Variant = "dark" | "light";

const SIZES: Record<Size, { padding: string; iconSize: number; eyebrow: number; title: number; gap: string }> = {
  sm: { padding: "12px 18px", iconSize: 16, eyebrow: 8,  title: 12.5, gap: "gap-2.5" },
  md: { padding: "14px 22px", iconSize: 20, eyebrow: 9,  title: 15,   gap: "gap-3" },
  lg: { padding: "17px 28px", iconSize: 24, eyebrow: 10, title: 17,   gap: "gap-4" },
};

interface BadgeProps {
  href: string;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  size: Size;
  variant: Variant;
}

function Badge({ href, icon, eyebrow, title, size, variant }: BadgeProps) {
  const s = SIZES[size];
  const isDark = variant === "dark";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center ${s.gap} transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90`}
      style={{
        padding: s.padding,
        borderRadius: "999px",
        backgroundColor: isDark ? "#0b0c0e" : "white",
        boxShadow: isDark ? "0 8px 28px rgba(11,12,14,0.22)" : "0 12px 40px rgba(0,0,0,0.18)",
        textDecoration: "none",
      }}
    >
      {icon}
      <div>
        <div
          className="leading-none uppercase"
          style={{ fontSize: s.eyebrow, letterSpacing: "0.08em", color: isDark ? "rgba(255,255,255,0.7)" : "rgba(30,30,46,0.5)", fontFamily: "var(--font-heebo)" }}
        >
          {eyebrow}
        </div>
        <div
          className="font-semibold leading-tight"
          style={{ fontSize: s.title, color: isDark ? "white" : "#1E1E2E", fontFamily: "var(--font-heebo)" }}
        >
          {title}
        </div>
      </div>
    </a>
  );
}

/**
 * The one Play Store / App Store badge pair used site-wide — was previously
 * hand-duplicated in 3+ files with drifting padding/font sizes. `size` scales
 * everything together; `variant` swaps black-on-white for white-on-dark.
 */
export default function StoreBadges({ size = "md", variant = "dark", className = "" }: { size?: Size; variant?: Variant; className?: string }) {
  const s = SIZES[size];
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Badge href={PLAY_STORE_URL} icon={<PlayStoreIcon size={s.iconSize} />} eyebrow="Get it on" title="Google Play" size={size} variant={variant} />
      <Badge href={APP_STORE_URL} icon={<AppStoreIcon size={s.iconSize} color={variant === "dark" ? "white" : "#1E1E2E"} />} eyebrow="Download on the" title="App Store" size={size} variant={variant} />
    </div>
  );
}
