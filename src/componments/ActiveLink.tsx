import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  href: string;
}

export const ActiveLink: React.FC<Props> = (props) => {
  const router = useRouter();
  return router.asPath == props.href ? (
    <span>{props.children}</span>
  ) : (
    <Link href={props.href}>{props.children}</Link>
  );
};
