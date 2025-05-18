'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@reloop/ui/components/form';
import { Input } from '@reloop/ui/components/input';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { signIn } from '@/lib/auth/client';
import { User } from '@reloop/auth/client';
import { object, string, minLength, pipe, email, InferInput } from 'valibot';
import { Button } from '@reloop/ui/components/button';
import { useStatus } from '@/hooks/useStatus';

const formSchema = object({
  email: pipe(string(), email()),
  password: pipe(string(), minLength(8)),
});

type FormSchema = InferInput<typeof formSchema>;

export const SignInForm = () => {
  const router = useRouter();
  const { setError, setSuccess, status, setLoading } = useStatus();
  const loading = status === 'loading';

  const form = useForm<FormSchema>({
    resolver: valibotResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      setLoading();
      const auth = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (auth.error) {
        if (auth.error.code === 'INVALID_EMAIL_OR_PASSWORD') {
          setError();
          form.setError('email', {
            type: 'manual',
            message: 'Invalid email or password',
          });
        } else {
          toast.error(auth.error.message);
        }
        return;
      }

      const user = auth.data.user as User;
      setSuccess(() =>
        router.push(`/${user.activeOrganization}/${user.activeMode}`),
      );
    } catch (e) {
      setError();
      if (e instanceof Error) toast.error(e.message);
      else toast.error('An unexpected error occurred.');
    }
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
        <Button status={status} type="submit" className="mt-2">
          Continue
        </Button>
      </form>
    </Form>
  );
};
