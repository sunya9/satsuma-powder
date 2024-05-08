"use client";

import { useEffect, useId, useRef } from "react";

export const DangerouslyHtml = ({ html }: { html: string }) => {
  const prefix = useId();
  useEffect(() => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const scripts = div.querySelectorAll("script");
    const externalScriptElementsWithId = Array.from(scripts)
      .filter((script) => script.src)
      .map((script, i) => {
        const id = `script-${prefix}-${i}`;
        script.id = id;
        const range = document.createRange();
        const fragment = range.createContextualFragment(script.outerHTML);
        return [id, fragment] as const;
      });
    externalScriptElementsWithId.forEach(([, script]) =>
      document.head.appendChild(script)
    );
    return () => {
      externalScriptElementsWithId.forEach(([id]) =>
        document.getElementById(id)?.remove()
      );
    };
  }, [html, prefix]);
  const div = useRef<HTMLDivElement>(null);

  useEffect(() => {
    div.current?.querySelectorAll("a").forEach((a) => (a.tabIndex = 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html]);
  return <div ref={div} dangerouslySetInnerHTML={{ __html: html }} />;
};
