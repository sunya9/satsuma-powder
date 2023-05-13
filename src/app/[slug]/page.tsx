import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppLayout } from "../../componments/AppLayout";
import { Article } from "../../componments/Article";
import { exclusionPageSlugs } from "../../lib/excludedPages";
import { ghostRepo } from "../../lib/ghost";

type Props = { params: { slug: string } };

const Post = async ({ params }: Props) => {
  if (exclusionPageSlugs.includes(params.slug)) notFound();
  const page = await ghostRepo.getPage(params.slug);
  if (!page) notFound();
  return (
    <AppLayout
      header={{
        title: page.title,
      }}
    >
      <Article postOrPage={page} />
    </AppLayout>
  );
};

export default Post;

export async function generateStaticParams() {
  const slugs = await ghostRepo
    .getPages()
    .then((res) =>
      res
        .map((post) => post.slug)
        .filter((slug) => !exclusionPageSlugs.includes(slug))
    );
  return slugs.map((slug) => {
    return {
      params: {
        slug,
      },
    };
  });
}

export const generateMetadata: (props: Props) => Promise<Metadata> = async ({
  params,
}) => {
  if (exclusionPageSlugs.includes(params.slug)) notFound();
  const page = await ghostRepo.getPage(params.slug);
  if (!page) notFound();
  return {
    title: page.title,
    description: page.custom_excerpt,
    alternates: {
      canonical: `/${page.slug}`,
    },
  };
};
