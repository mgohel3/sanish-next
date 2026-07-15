type BrandMonogramProps = {
  size?: number;
  gap?: number;
  className?: string;
};

const DOTS = ["#85addc", "#ac8cc0", "#f39ba2", "#fabf7d"];

export default function BrandMonogram({
  size = 9,
  gap,
  className = "",
}: BrandMonogramProps) {
  const dotGap = gap ?? size * 0.065;

  return (
    <span
      className={`brand-monogram ${className}`}
      aria-hidden="true"
      style={{
        display: "inline-grid",
        gridTemplateColumns: `repeat(2, ${size}px)`,
        gap: dotGap,
        lineHeight: 0,
      }}
    >
      {DOTS.map((color) => (
        <span
          key={color}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
      ))}
    </span>
  );
}
