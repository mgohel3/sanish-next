export interface VideoEmbedContent {
  heading?: string;
  video_url?: string;
  caption?: string;
}

/** Converts a normal YouTube/Vimeo watch URL into its embeddable form. */
function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return url; // already an embed URL or a direct video source
  } catch {
    return null;
  }
}

/** An embedded YouTube / Vimeo video with an optional heading and caption. CMS-managed, addable to any page. */
export default function VideoEmbedBlock({ content = {} }: { content?: VideoEmbedContent }) {
  const { heading, video_url, caption } = content;
  const embedUrl = video_url ? toEmbedUrl(video_url) : null;

  if (!embedUrl) return null;

  return (
    <section className="home-section--compact bg-[var(--bg-primary)]">
      <div className="site-container max-w-4xl">
        {heading && (
          <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] text-[var(--text-primary)] text-center mb-10">
            {heading}
          </h2>
        )}
        <div className="relative w-full overflow-hidden rounded-[24px]" style={{ aspectRatio: "16 / 9" }}>
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={heading || "Video"}
          />
        </div>
        {caption && (
          <p className="text-[13px] text-[var(--text-secondary)] text-center mt-4">{caption}</p>
        )}
      </div>
    </section>
  );
}
