/** Renders one structured-data block (schema.org JSON-LD). `<` is escaped so content can never close the script tag early. */
export default function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
