type PageHeroProps = {
  eyebrow: string;
  title: string;
  image: string;
  description?: string;
};

export default function PageHero({
  eyebrow,
  title,
  image,
  description,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <img src={image} alt="" className="page-hero__image" />
      <div className="page-hero__overlay" />
      <div className="page-hero__content">
        <div className="page-hero__eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </section>
  );
}
