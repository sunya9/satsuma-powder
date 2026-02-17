import { parse } from "node-html-parser";
import Script from "next/script";

function extractScripts(html: string) {
  const root = parse(html);
  const { externalSrcs, inlineScripts } = root
    .querySelectorAll("script")
    .reduce<{ externalSrcs: string[]; inlineScripts: string[] }>(
      (acc, el) => {
        const src = el.getAttribute("src");
        if (src) acc.externalSrcs.push(src);
        else if (el.textContent.trim()) acc.inlineScripts.push(el.textContent);
        el.remove();
        return acc;
      },
      { externalSrcs: [], inlineScripts: [] },
    );
  return { html: root.toString(), externalSrcs, inlineScripts };
}

export const DangerouslyHtml = ({ html }: { html: string }) => {
  const { html: sanitizedHtml, externalSrcs, inlineScripts } =
    extractScripts(html);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
      {externalSrcs.map((src) => (
        <Script key={src} src={src} strategy="afterInteractive" />
      ))}
      {inlineScripts.map((code, i) => (
        <Script
          key={i}
          id={`inline-script-${i}`}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      ))}
    </>
  );
};
