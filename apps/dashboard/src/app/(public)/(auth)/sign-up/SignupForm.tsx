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
import { signUp } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z
  .object({
    email: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
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
    await signUp
      .email({
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
        callbackURL: `/dashboard`,
        fetchOptions: {
          onRequest: () => {
            setLoading(true);
          },
          onResponse: () => {
            setLoading(false);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: async () => {
            router.push("/dashboard");
          },
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
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
