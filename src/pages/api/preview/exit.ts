import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  res.clearPreviewData().writeHead(307, { Location: "/" }).end();
};

export default handler;
