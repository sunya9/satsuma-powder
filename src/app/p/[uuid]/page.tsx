import { AppLayout } from "../../../componments/AppLayout";
import { Article } from "../../../componments/Article";
import { ghostRepo } from "../../../lib/ghost";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    uuid: string;
  }>;
};

const Preview = async (props: Props) => {
  const { uuid } = await props.params;
  const draft = await ghostRepo.getDraft(uuid).catch(console.error);
  if (!draft) return notFound();
  return (
    <AppLayout
      header={{
        title: draft.title,
      }}
    >
      <Article postOrPage={draft} />
    </AppLayout>
  );
};

export default Preview;
