import { OgImageTemplate } from "../../componments/OgImageTemplate";

export const size = {
  width: 1200,
  height: 630,
};

export const dynamic = "force-static";

export const contentType = "image/png";
export default async function Image() {
  return OgImageTemplate({
    title: "全ての投稿",
  });
}
