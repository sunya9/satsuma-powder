"use client";

import { useEffect, useRef } from "react";

export const DangerouslyHtml = ({ html }: { html: string }) => {
  useEffect(() => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const scripts = div.querySelectorAll("script");
    const externalScriptElementsWithId = Array.from(scripts)
      .filter((script) => script.src)
      .map((script) => {
        const id = `script-${Date.now()}`;
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
  }, [html]);
  const div = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    div.current?.querySelectorAll("a").forEach((a) => (a.tabIndex = 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html]);
  return (
    <div
      ref={(el) => (div.current = el)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
