import { NextApiHandler } from "next";

const handler: NextApiHandler<void> = (req, res) => {
  const uuid = req.query.uuid;
  if (typeof uuid !== "string") return res.status(400).end();
  res.setPreviewData({ uuid }).redirect(`/preview`).end();
};

export default handler;
