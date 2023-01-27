import { PreviewData } from "next";
import { previewData } from "next/headers";
import { AppLayout } from "../../componments/AppLayout";
import { Article } from "../../componments/Article";
import { ghostRepo } from "../../lib/ghost";
import { notFound } from "next/navigation";

type AppPreviewData = {
  uuid: string;
};

function isAppPreviewData(obj: PreviewData): obj is AppPreviewData {
  return typeof obj == "object";
}

const Preview = async () => {
  const data = previewData();
  if (!isAppPreviewData(data)) return notFound();
  const uuid = data.uuid;
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
