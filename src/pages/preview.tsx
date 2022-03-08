import { PostOrPage } from "@tryghost/content-api";
import { GetServerSideProps } from "next";
import { AppLayout } from "../componments/AppLayout";
import { Article } from "../componments/Article";
import { ghostRepo } from "../lib/ghost";

interface Props {
  draft: PostOrPage;
}

const Preview = ({ draft }: Props) => {
  return (
    <AppLayout title={draft.title}>
      <Article postOrPage={draft} />
    </AppLayout>
  );
};

export default Preview;

interface PreviewData {
  uuid: string;
}

export const getServerSideProps: GetServerSideProps<
  Props,
  Record<string, never>,
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
