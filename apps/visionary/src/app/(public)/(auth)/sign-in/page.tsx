import Link from "next/link";
import { SignInForm } from "./SignInform";

const Page = () => {
  return (
    <div>
      <SignInForm />
      <div className="text-center text-sm pt-7 font-medium text-muted-foreground">
        Don&apos;t you already an account?{" "}
        <Link href="/sign-up" className="text-primary underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Page;
