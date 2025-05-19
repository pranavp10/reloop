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
import { organization, signUp, updateUser } from '@/lib/auth/client';
import { generateId } from 'better-auth';
import { Button } from '@reloop/ui/components/button';
import {
  object,
  string,
  minLength,
  maxLength,
  email,
  pipe,
  forward,
  partialCheck,
  InferInput,
} from 'valibot';
import { useLoading } from '@/hooks/useLoading';

const formSchema = pipe(
  object({
    email: pipe(
      string('Email is required'),
      email('Enter a valid email address'),
      maxLength(50, 'Email must be 50 characters or fewer'),
    ),
    password: pipe(
      string('Password is required'),
      minLength(8, 'Password must be at least 8 characters'),
      maxLength(50),
    ),
    confirmPassword: string('Please confirm your password'),
    firstName: pipe(
      string('First name is required'),
      minLength(2, 'Must be at least 2 characters'),
      maxLength(50),
    ),
    lastName: pipe(
      string('Last name is required'),
      minLength(1, 'Must be at least 1 character'),
      maxLength(50),
    ),
  }),
  forward(
    partialCheck(
      [['password'], ['confirmPassword']],
      (input) => input.password === input.confirmPassword,
      'Passwords do not match',
    ),
    ['confirmPassword'],
  ),
);

type SignupValues = InferInput<typeof formSchema>;

export const SignupForm = () => {
  const router = useRouter();
  const { setError, setSuccess, status, setLoading, setIdle } = useLoading();
  const loading = status === 'loading';
  const form = useForm<SignupValues>({
    resolver: valibotResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignupValues) => {
    try {
      setLoading();
      const name = `${data.firstName} ${data.lastName}`;
      const auth = await signUp.email({
        email: data.email,
        password: data.password,
        name,
        callbackURL: '/onboarding',
      });
      if (auth.error) {
        if (auth.error.code === 'USER_ALREADY_EXISTS') {
          setError();
          form.setError('email', {
            type: 'manual',
            message: 'User already exists',
          });
        } else {
          setIdle();
          toast.error(auth.error.message);
        }
        return;
      }

      const org = await organization.create({
        name,
        slug: `${name.replace(/\s+/g, '-').toLowerCase()}-${generateId()}`,
      });

      if (org.error) {
        setError();
        toast.error(org.error.message);
        return;
      }
      await updateUser({ activeOrganization: org.data?.id });
      setSuccess(() => router.push('/onboarding'));
    } catch (e) {
      setIdle();
      if (e instanceof Error) toast.error(e.message);
      else toast.error('An unexpected error occurred.');
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
                    id="lastName"
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
        <Button status={status} type="submit" className="mt-2">
          Continue
        </Button>
      </form>
    </Form>
  );
};
