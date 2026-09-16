export interface TeamMember {
  photo?: string;
  name?: string;
  role?: string;
  bio?: string;
}
export interface TeamContent {
  heading?: string;
  sub?: string;
  columns?: "2" | "3" | "4";
  members?: TeamMember[];
}

const GRID_COLS: Record<string, string> = {
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
};

/** Heading over a grid of team member photo + name + role + bio. CMS-managed, addable to any page. */
export default function TeamBlock({ content = {} }: { content?: TeamContent }) {
  const { heading, sub, columns = "3", members = [] } = content;

  if (members.length === 0) return null;

  return (
    <section className="home-section--compact bg-[var(--bg-primary)]">
      <div className="site-container">
        {(heading || sub) && (
          <div className="text-center mb-14">
            {heading && (
              <h2 className="font-serif text-[clamp(28px,3.5vw,46px)] text-[var(--text-primary)]">{heading}</h2>
            )}
            {sub && (
              <p className="text-[15px] text-[var(--text-secondary)] mt-3 max-w-xl mx-auto leading-[1.7]">{sub}</p>
            )}
          </div>
        )}

        <div className={`grid grid-cols-1 ${GRID_COLS[columns] || GRID_COLS["3"]} gap-10`}>
          {members.map((m, i) => (
            <div key={i} className="text-center">
              {m.photo && (
                <div className="w-full rounded-[20px] overflow-hidden mb-5" style={{ aspectRatio: "1 / 1" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.photo} alt={m.name || ""} className="w-full h-full object-cover" />
                </div>
              )}
              {m.name && <h3 className="text-[16px] font-bold text-[var(--text-primary)]">{m.name}</h3>}
              {m.role && <div className="text-[12px] uppercase tracking-[0.1em] text-[var(--text-secondary)] mt-1">{m.role}</div>}
              {m.bio && <p className="text-[13.5px] text-[var(--text-secondary)] leading-[1.7] mt-3">{m.bio}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
