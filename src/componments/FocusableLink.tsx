import Link from "next/link";
import React from "react";

interface Props {
  external?: boolean;
}

export const FocusableLink: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & Props
> = ({ tabIndex, href, external, ...rest }) => {
  if (external || href?.startsWith("http")) {
    return <a tabIndex={tabIndex || 0} {...rest} />;
  } else {
    return (
      <Link href={href || ""} passHref>
        <a tabIndex={tabIndex || 0} {...rest} />
      </Link>
    );
  }
};
