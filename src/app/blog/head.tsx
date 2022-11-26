import { Canonical, Description } from "../../lib/head";

export default function Head() {
  return (
    <>
      <title>全ての投稿</title>
      <Description description="過去の投稿一覧です。" />
      <Canonical relativePath="blog" />
    </>
  );
}
