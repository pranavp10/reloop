"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@reloop/ui/components/form";
import { Input } from "@reloop/ui/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@reloop/ui";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { signIn } from "@/lib/auth/client";
import { User } from "@reloop/auth";
const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});

export const SignInForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const auth = await signIn.email({
      email: data.email,
      password: data.password,
    });
    if (auth.error) {
      setLoading(false);
      if (auth.error.code === "INVALID_EMAIL_OR_PASSWORD") {
        form.setError("email", {
          type: "manual",
          message: "Invalid email or password",
        });
      } else {
        toast.error(auth.error.message);
      }
      return;
    }
    const user = auth.data.user as User;
    router.push(`/${user.activeOrganization}/${user.activeMode}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="akaram@gmail.com"
                  required
                  className="bg-white"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                <Link
                  href="/reset-password"
                  className="ml-auto text-muted-foreground text-xs font-medium underline-offset-4 hover:text-primary"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  className="bg-white"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={loading} type="submit" className="mt-2">
          Continue
        </Button>
      </form>
    </Form>
  );
};
