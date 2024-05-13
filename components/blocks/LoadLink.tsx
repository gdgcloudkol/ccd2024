"use client";

import React, { ReactNode, useEffect, useState } from "react";
import NextLink, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import { useLoadingContext } from "@/app/loading-provider";

interface LoadLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  target?: string;
  ref?: React.Ref<HTMLAnchorElement>;
}

const LoadLink: React.FC<LoadLinkProps> = ({ children, ...props }) => {
  const [startLoading, setStartLoading] = useState(false);
  const { setLoading } = useLoadingContext();
  const pathname = usePathname();
  const handleClick = () => {
    if (props?.href != pathname) setStartLoading(true);
  };
  useEffect(() => {
    setLoading(() => startLoading);
  }, [startLoading]);

  return (
    <NextLink {...props} onClick={(e) => handleClick()}>
      {children}
    </NextLink>
  );
};

export default LoadLink;
