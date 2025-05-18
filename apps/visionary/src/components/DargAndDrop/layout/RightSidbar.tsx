import { Textarea } from "@reloop/ui/components/textarea";

export const RightSidebar = () => {
  return (
    <div className="h-[calc(100dvh-48px)] max-w-sm w-full border-r border-dashed p-4 relative">
      <p className="font-medium">AI Email</p>
      <p className="text-muted-foreground text-sm">
        Generate Email UI using tempelate
      </p>
      <div className="left-0 right-0 absolute bottom-4">
        <div className="px-4">
          <Textarea className="border border-dashed" />
        </div>
      </div>
    </div>
  );
};
