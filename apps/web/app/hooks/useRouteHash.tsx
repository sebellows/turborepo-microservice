import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useRouteHash() {
  let router = useRouter();
  let [hash, setHash] = useState('0');

  useEffect(() => setHash(window.location.hash), []);

  useEffect(() => {
    function onHashChangeComplete() {
      if (hash !== window.location.hash) {
        setHash(window.location.hash);
      }
    }

    router.events.on("hashChangeComplete", onHashChangeComplete);

    return () => {
      router.events.off("hashChangeComplete", onHashChangeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);

  return hash;
}
