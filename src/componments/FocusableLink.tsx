import Link from "next/link";
import React, { PropsWithChildren } from "react";

interface Props {
  external?: boolean;
}

export const FocusableLink = ({
  tabIndex,
  href,
  external,
  ...rest
}: PropsWithChildren<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & Props
>) => {
  if (external || href?.startsWith("http")) {
    return <a tabIndex={tabIndex || 0} {...rest} href={href} />;
  } else {
    return <Link href={href || ""} tabIndex={tabIndex || 0} {...rest} />;
  }
};
