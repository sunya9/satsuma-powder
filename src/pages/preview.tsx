import { PostOrPage } from "@tryghost/content-api";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { AppLayout } from "../componments/AppLayout";
import { Article } from "../componments/Article";
import { ghostRepo } from "../lib/ghost";

interface Props {
  draft: PostOrPage;
}

const Post = ({ draft }: Props) => {
  return (
    <AppLayout title={draft.title}>
      <Article postOrPage={draft} />
    </AppLayout>
  );
};

export default Post;

interface PreviewData {
  uuid: string;
}

export const getStaticProps: GetServerSideProps<
  Props,
  {},
  PreviewData
> = async (context) => {
  const uuid = context.previewData?.uuid;
  if (!uuid || !context.preview) return { notFound: true };
  const draft = await ghostRepo.getDraft(uuid).catch(console.error);
  if (!draft) return { notFound: true };
  return {
    props: {
      draft,
    },
  };
};
