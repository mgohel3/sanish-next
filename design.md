# Sanish Frontend Design System

## Brand direction

Sanish uses a neutral visual foundation with a restrained cool-colour highlight system.

- Primary surfaces: white, off-white, light grey, silver, charcoal and black.
- Brand highlights: only the four approved Sanish colours below.
- Do not introduce beige, cream, brown, green, teal or unrelated accent colours into interface styling.
- Product photography may contain natural material colours; these restrictions apply to the interface.

---

## Approved palette

| Token | Hex | Fixed role |
| --- | --- | --- |
| Sanish Apricot | `#fabf7d` | Brand monogram top-left dot, small badges and warm decorative details |
| Sanish Purple | `#ac8cc0` | Filters, selected filter states, navigation indicators and category controls |
| Sanish Pink | `#f39ba2` | Hover, focus, active interaction and secondary highlight states |
| Sanish Blue | `#85addc` | Primary buttons, links, CTAs and primary action icons |

Neutral tokens:

| Token | Hex | Role |
| --- | --- | --- |
| White | `#ffffff` | Cards and clean surfaces |
| Off-white | `#fafafa` | Main page background (`--bg-primary`) |
| Soft grey | `#f3f4f6` | Alternate sections and controls (`--bg-secondary`) |
| Silver | `#d9dce1` | Borders and dividers |
| Charcoal | `#24262b` | Main text and dark surfaces |
| Black | `#0b0c0e` | Maximum-contrast text |

---

## Typography

Typography is semantic and consistent across the complete frontend.

| Font | CSS variable | Fixed role |
| --- | --- | --- |
| Vogue | `var(--font-vogue)` | Display — page titles and primary section headings (`h1`, `h2`, `.font-serif`) |
| Poppins | `var(--font-poppins)` | UI — navigation, buttons, labels, filters, cards, sub-headings (`h3`–`h6`) |
| Heebo | `var(--font-heebo)` | Body — paragraphs, lists, forms, descriptions and long-form copy |

### Type scale

| Role | Classes / values | Notes |
| --- | --- | --- |
| Page h1 (hero) | `font-serif text-[clamp(48px,6vw,88px)] font-normal leading-[1.02]` | Hero sections only |
| Section h2 | `font-serif text-[clamp(32px,4vw,52px)] font-normal leading-[1.1]` | Every content section |
| Sub-heading h3 | `text-[clamp(20px,2.5vw,28px)] font-semibold leading-[1.25]` (Poppins via CSS) | Card titles, sidebar headings |
| Eyebrow | `text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-blue)]` | Above every section h2 |
| Body large | `text-[16px] leading-[1.75]` | Section intro paragraphs |
| Body default | `text-[14px] md:text-[15px] leading-[1.7]` | Card descriptions, general copy |
| Label / UI | `text-[12px] font-semibold uppercase tracking-[0.1em]` | Buttons, tags, filters |

### Rules

- `h1` and `h2` must always use `font-serif` (= Vogue/Bodoni fallback). Never override with `font-jakarta`, `font-poppins`, `font-bold` or inline `fontFamily` on heading elements.
- `h3`–`h6`, nav, buttons, labels use Poppins. Applied globally via CSS; no need for inline `fontFamily`.
- Body paragraphs use Heebo. Applied globally via CSS.
- Do not use `font-bold` on serif headings — use `font-normal` or `font-medium`.

---

## Layout — the single source of truth

### Content container

**Every section** must use exactly one of these two wrappers:

```html
<!-- Standard (all content sections) -->
<div class="site-container">…</div>

<!-- Narrow (article text, forms, narrow callouts) -->
<div class="site-container-narrow">…</div>
```

CSS definitions (in globals.css):

```css
.site-container {
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding-left: clamp(24px, 4vw, 64px);
  padding-right: clamp(24px, 4vw, 64px);
}

.site-container-narrow {
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding-left: clamp(24px, 4vw, 64px);
  padding-right: clamp(24px, 4vw, 64px);
}
```

**Do not use** `container mx-auto`, `max-w-[1380px]`, `max-w-[1200px]`, `px-8 md:px-14`, or any other variant.

### Section vertical spacing

| Class | Value | Use |
| --- | --- | --- |
| `.section-xl` | `py-24 md:py-32` | Hero sections, major feature sections |
| `.section-lg` | `py-16 md:py-24` | Standard content sections (default) |
| `.section-md` | `py-12 md:py-16` | Compact sections, filter bars |

### Section header pattern

Every content section follows this exact structure:

```jsx
<div className="section-header">           {/* mb-12 or mb-14 */}
  <p className="eyebrow">Credentials</p>   {/* blue, 11px, uppercase */}
  <h2 className="font-serif …">Title</h2>
  <p className="body-intro">Description paragraph (optional)</p>
</div>
```

CSS for `.eyebrow` and `.section-header` are in globals.css.

### Text alignment rules

| Context | Alignment |
| --- | --- |
| All standard content sections (default) | **Left** — never force `text-center` on a section that has a left-column layout |
| Full-width standalone CTA, stats, certifications centre of page | **Center** — only when there is no left/right split |
| Hero sections | Left (content) or centered (depends on hero type) |
| Card body copy | Left |
| Navigation | Left for links, center for mobile drawer items |

**Never** use `text-center` on a section `<div>` that contains a two-column grid — align each column independently.

---

## Colour behaviour

Colours are semantic, never random.

1. All primary buttons and text links use Sanish Blue.
2. Hover and keyboard-focus states use Sanish Pink.
3. Filters, selected chips, category selectors and navigation indicators use Sanish Purple.
4. Badges and small decorative highlights use Sanish Apricot.
5. Body copy and structural UI remain neutral.
6. A component keeps the same colour role on every page.

---

## Monogram

The Sanish monogram is a two-by-two arrangement of equal circles:

```text
Apricot  Purple
Pink     Blue
```

- Circle size is identical.
- Horizontal and vertical gaps are identical.
- Gap equals approximately 6.4% of one circle's diameter, matching the supplied artwork.
- The mark must not rotate, shuffle or recolour.
- Standard UI size: 9px circles with a proportional 0.585px gap.

---

## Components

### Buttons

- Every button and button-like link uses a pill radius (`999px`).
- Primary: blue background, white text; pink on hover.
- Secondary: neutral background/border; pink border/text on hover.
- Filters: purple when selected.
- Use `.btn-pill .btn-pill-primary` or `.btn-pill .btn-pill-ghost` CSS classes.

### Links

- Default interactive emphasis is blue.
- Hover and focus emphasis is pink.
- Navigation underlines transition from blue to pink.

### Cards and media

- Cards use neutral surfaces and 18–24px corner radii.
- Homepage feature video/image sections use a rectangular `16:9` aspect ratio.
- Avoid portrait video framing for editorial or company-story sections.

### Inner-page heroes

- Every non-home content page begins with an image hero below the header.
- Heroes use a wide rectangular image, a neutral dark overlay, a small blue eyebrow and a white/charcoal title.
- Home, Home 1 and Home 2 retain their dedicated homepage hero treatments.

### Footer

- Footer background remains neutral.
- Phone, email and location details include relevant icons.
- Social buttons are circular; newsletter and download actions are pill-shaped.

---

## Accessibility

- Preserve clear contrast between text and backgrounds.
- Focus states must be visible and pink.
- Icons supplement labels and never replace essential text.
- Interactive elements must retain a minimum practical touch target of 40px.
