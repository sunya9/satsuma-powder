import { OgImageTemplate } from "../componments/OgImageTemplate";
import { config } from "../lib/config";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export default async function Image() {
  return OgImageTemplate({
    title: config.title,
    description: config.description,
  });
}
