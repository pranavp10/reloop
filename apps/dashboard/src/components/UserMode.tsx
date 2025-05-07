"use client";

import { usePush } from "@/hooks/usePush";
import { RadioGroup, RadioGroupItem } from "@reloop/ui/components/radio-group";
import { Terminal, Workflow } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId } from "react";

export default function UserMode() {
  const router = useRouter();
  const id = useId();
  const { mode } = usePush();

  return (
    <div className="bg-input/50 inline-flex h-9 rounded-full p-0.5 ">
      <RadioGroup
        value={mode}
        onValueChange={(value) => {
          if (value === "dev") {
            router.push("/dev");
          }
          if (value === "marketing") {
            router.push("/marketing");
          }
        }}
        className="flex-1 group after:bg-background has-focus-visible:after:border-ring has-focus-visible:after:ring-ring/50 relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-full after:shadow-xs after:transition-[translate,box-shadow] after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] has-focus-visible:after:ring-[3px] data-[state=dev]:after:translate-x-0 data-[state=marketing]:after:translate-x-full"
        data-state={mode}
      >
        <label className="group-data-[state=marketing]:text-muted-foreground/70 relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap transition-colors select-none gap-2">
          <Terminal className="w-3 h-3" />
          <span className="text-xs">Dev</span>
          <RadioGroupItem id={`${id}-1`} value="dev" className="sr-only" />
        </label>
        <label className="group-data-[state=dev]:text-muted-foreground/70 relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap transition-colors select-none gap-2">
          <Workflow className="w-3 h-3" />
          <span className="text-xs">Marketing</span>
          <RadioGroupItem
            id={`${id}-2`}
            value="marketing"
            className="sr-only"
          />
        </label>
      </RadioGroup>
    </div>
  );
}
