import { notFound } from "next/navigation";
import { exclusionPageSlugs } from "../../lib/excludedPages";
import { ghostRepo } from "../../lib/ghost";
import { Canonical, Description } from "../../lib/head";

export default async function Head({ params }: { params: { slug: string } }) {
  if (exclusionPageSlugs.includes(params.slug)) notFound();
  const page = await ghostRepo.getPage(params.slug);
  if (!page) notFound();

  return (
    <>
      <title>{page.title}</title>
      <Description description={page.custom_excerpt} />
      <Canonical relativePath={page.slug} />
    </>
  );
}
