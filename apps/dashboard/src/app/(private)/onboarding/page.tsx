import { NavUser } from "@/components/NavUser";
import { Logo } from "@reloop/ui/components/logo";
import { SelectMode } from "./SelectMode";

const Page = () => {
  return (
    <div className="max-w-7xl mx-auto h-dvh flex flex-col">
      <div className="pt-10 flex justify-between items-center w-full">
        <div className="flex gap-2 items-center">
          <Logo className="w-[26px] h-[26px]" />
          <span className="text-base font-semibold">ReLoop</span>
        </div>
        <div>
          <NavUser size={25} />
        </div>
      </div>
      <div className="max-w-4xl mx-auto w-full flex-1 flex justify-center items-center flex-col gap-6">
        <div>
          <p className="text-4xl font-semibold text-center">
            Choose your way to send emails
          </p>
          <p className="text-sm  text-muted-foreground text-center pt-1">
            change your modes when ever you need
          </p>
        </div>
        <SelectMode />
      </div>
    </div>
  );
};

export default Page;
