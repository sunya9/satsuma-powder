import { ImageResponse } from "next/og";
import { config } from "../lib/config";
import { formatDate } from "../lib/date";
import { Nullable } from "@tryghost/content-api";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface Props {
  title?: string;
  date?: Nullable<string>;
  description?: string;
}
export async function OgImageTemplate({ title, date, description }: Props) {
  const font = await fetchFont();
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "#fffffc",
        }}
      >
        <div
          style={{
            display: "flex",
            width: size.width - 48 * 2,
            height: size.height - 48 * 2,
            margin: 48,
            border: "4px solid #fbfaf3", // --border-color
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              marginLeft: 48,
              marginRight: 48,
              flexDirection: "column",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={config.icon} alt="icon" width={128} height={128} />
            <div
              style={{
                marginTop: 24,
                fontSize: 20,
                color: "#4e4449", // --secondary-text-color,
              }}
            >
              {date && formatDate(date)}
            </div>
            <div
              style={{
                fontSize: 48,
                color: "#2f2725", // --text-color
              }}
            >
              {title}
            </div>
            <div
              style={{
                marginTop: 24,
                fontSize: 24,
                display: "flex",
                flexDirection: "row",
                color: "#4e4449", // --secondary-text-color,
              }}
            >
              {description || config.title}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      fonts: [
        {
          data: font,
          name: "Noto Sans JP",
        },
      ],
    }
  );
}

async function fetchFont(): Promise<ArrayBuffer> {
  const googleFontsUrl = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400&display=swap`;

  const css = await fetch(googleFontsUrl).then((res) => res.text());

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (!resource) throw new Error("Failed to fetch font");
  const res = await fetch(resource[1]);
  return res.arrayBuffer();
}
