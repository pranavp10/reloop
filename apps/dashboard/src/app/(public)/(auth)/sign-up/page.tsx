import Link from "next/link";
import { SignupForm } from "./SignupForm";

const Page = () => {
  return (
    <div>
      <SignupForm />
      <div className="text-center text-sm pt-7 font-medium text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Page;
