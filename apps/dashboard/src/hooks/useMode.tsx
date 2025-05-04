import { usePathname } from "next/navigation";

export const useMode = () => {
  const path = usePathname();
  const isDev = path.includes("/dev");
  const mode: "dev" | "marketing" = isDev ? "dev" : "marketing";
  return { isDev, isMarketing: !isDev, mode };
};
