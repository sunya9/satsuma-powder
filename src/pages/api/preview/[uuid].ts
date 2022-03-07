import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const uuid = req.query.uuid;
  if (typeof uuid !== "string") return void res.status(400).end();
  res.setPreviewData({ uuid }).redirect(`/preview`).end();
};

export default handler;
