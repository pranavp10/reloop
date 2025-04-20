import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";
import { AlignHorizontalJustifyEnd } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      sidebar={{
        enabled: true,
        tabs: [
          {
            title: "Hi",
            description: "Hello World!",
            url: "/docs/components",
            icon: <AlignHorizontalJustifyEnd />,
          },
        ],
      }}
    >
      {children}
    </DocsLayout>
  );
}
