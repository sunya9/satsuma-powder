import { AppLayout } from "../../../componments/AppLayout";
import { Article } from "../../../componments/Article";
import { ghostRepo } from "../../../lib/ghost";
import { notFound } from "next/navigation";

type Props = {
  params: {
    uuid: string;
  };
};

const Preview = async ({ params }: Props) => {
  const uuid = params.uuid;
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
