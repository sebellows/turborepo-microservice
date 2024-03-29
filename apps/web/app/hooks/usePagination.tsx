import { useContext } from "react";
import { useRouter } from 'next/router'

import { SidebarContext } from "../layouts/Sidebar.layout";

export function usePrevNext() {
  let router = useRouter();
  let { nav } = useContext(SidebarContext);
  let pages = Object.keys(nav).flatMap((category) => nav[category]);
  let pageIndex = pages.findIndex((page) => page.href === router.pathname);
  return {
    prev: pageIndex > -1 ? pages[pageIndex - 1] : undefined,
    next: pageIndex > -1 ? pages[pageIndex + 1] : undefined,
  };
}
