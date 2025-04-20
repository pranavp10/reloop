import { Button } from "@reloop/ui";
import { Input } from "@reloop/ui/components/input";
import { Label } from "@reloop/ui/components/label";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-white"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/reset-password"
              className="ml-auto text-muted-foreground text-xs font-medium underline-offset-4 hover:text-primary"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            className="bg-white"
            type="password"
            required
            placeholder="*********"
          />
        </div>
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </div>
      <div className="text-center text-sm pt-7 font-medium text-muted-foreground">
        Don&apos;t you already an account?{" "}
        <Link href="/sign-up" className="text-primary">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Page;
