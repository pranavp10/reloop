"use client";

import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/lib/auth/client";
import { useCallback, useMemo } from "react";

export const usePush = () => {
  const { data } = useSession();
  const { push: nextPush } = useRouter();
  const pathname = usePathname();

  const { mode, isDev, isMarketing } = useMemo(() => {
    const pathParts = pathname.split("/");
    const currentMode = pathParts.length > 2 ? pathParts[2] : "";
    const isDev = currentMode.includes("dev");
    const mode: Mode = isDev ? "dev" : "marketing";

    return { mode, isDev, isMarketing: !isDev };
  }, [pathname]);

  const { activeOrganization, activeMode } = useMemo(
    () => ({
      activeOrganization: data?.user?.activeOrganization,
      activeMode: data?.user?.activeMode,
    }),
    [data?.user],
  );

  const basePath = useMemo(() => {
    return activeOrganization && activeMode
      ? `/${activeOrganization}/${activeMode}`
      : "";
  }, [activeOrganization, activeMode]);

  const push = useCallback(
    (path: string) => {
      if (basePath) {
        nextPush(`${basePath}${path}`);
      } else {
        nextPush(path);
      }
    },
    [basePath, nextPush],
  );

  const changeMode = useCallback(
    (targetMode: Mode) => {
      if (activeOrganization) {
        nextPush(`/${activeOrganization}/${targetMode}`);
      }
    },
    [activeOrganization, nextPush],
  );

  const matchRoute = useCallback(
    (routePath: string) => {
      const currentPathSegments = pathname.split("/").slice(0, 3).join("/");
      return currentPathSegments.includes(routePath);
    },
    [pathname],
  );

  return { push, matchRoute, changeMode, mode, isDev, isMarketing };
};
