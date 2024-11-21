import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren } from "react";

interface Props extends LinkProps {
  external?: boolean;
}

export const FocusableLink = ({
  href,
  external,
  ...rest
}: PropsWithChildren<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & Props
>) => {
  if (external || href?.startsWith("http")) {
    return <a {...rest} href={href} />;
  } else {
    return <Link href={href || ""} {...rest} />;
  }
};
