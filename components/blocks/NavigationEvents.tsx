"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { useLoadingContext } from "@/app/loading-provider";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { setLoading } = useLoadingContext();

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  return null;
}
