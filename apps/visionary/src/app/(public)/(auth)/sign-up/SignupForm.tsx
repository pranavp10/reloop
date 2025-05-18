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
import { organization, signUp, updateUser } from "@/lib/auth/client";
import { generateId } from "better-auth";

const formSchema = z
  .object({
    email: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(1).max(50),
    confirmPassword: z.string().min(8).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const SignupForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const name = `${data.firstName} ${data.lastName}`;
      const auth = await signUp.email({
        email: data.email,
        password: data.password,
        name,
        callbackURL: `/onboarding`,
      });
      if (auth.error) {
        setLoading(false);
        if (auth.error.code === "USER_ALREADY_EXISTS") {
          form.setError("email", {
            type: "manual",
            message: "User already exists",
          });
        } else {
          toast.error(auth.error.message);
        }
        return;
      }
      const org = await organization.create({
        name,
        slug: `${name.replace(/\s+/g, "-").toLowerCase()}-${generateId()}`,
      });
      await updateUser({
        activeOrganization: org.data?.id,
      });
      if (org.error) {
        setLoading(false);
        toast.error(org.error.message);
        return;
      }
      router.push("/onboarding");
    } catch (e) {
      setLoading(false);
      if (e instanceof Error && e.message) {
        toast.error(e.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    id="firstName"
                    type="name"
                    placeholder="sam"
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
            name="lastName"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    id="lastname"
                    type="name"
                    placeholder="altman"
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
        </div>
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
              <FormLabel>Password</FormLabel>
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  id="confirm-password"
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
