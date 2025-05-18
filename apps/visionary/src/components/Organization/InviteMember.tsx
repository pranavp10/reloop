'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@reloop/ui/components/form';
import { Input } from '@reloop/ui/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@reloop/ui/components/select';
import { Label } from '@reloop/ui/components/label';
import { Button } from '@reloop/ui/components/button';
import {
  object,
  string,
  pipe,
  email,
  array,
  minLength,
  union,
  literal,
  InferInput,
} from 'valibot';

const userSchema = object({
  email: pipe(
    string('Email is required'),
    email('Please enter a valid email address'),
  ),
  role: union([literal('dev'), literal('marketing'), literal('admin')]),
});

const formSchema = object({
  users: pipe(array(userSchema), minLength(1, 'Add at least one user')),
});

type InviteValues = InferInput<typeof formSchema>;

export const InviteMember = ({ onBack }: { onBack: () => void }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<InviteValues>({
    resolver: valibotResolver(formSchema),
    defaultValues: {
      users: [{ email: '', role: 'dev' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'users',
  });

  const onSubmit = async (data: InviteValues) => {
    setLoading(true);
    try {
      console.log('Inviting members:', data.users);

      await new Promise((r) => setTimeout(r, 1000)); // fake API

      toast.success('Team members invited successfully!');
      form.reset({ users: [{ email: '', role: 'admin' }] });
    } catch (error) {
      toast.error('Failed to invite team members');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addNewUser = () => append({ email: '', role: 'admin' });

  /* --------------------------------- UI ---------------------------------- */

  return (
    <>
      <div className="bg-white p-6">
        <p className="text-2xl font-medium">Invite Team Members</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="border-t">
          <div className="space-y-4 gap-7 px-6 pb-10">
            <p className="text-sm pt-6 pb-3">
              Enter the email addresses of the people you'd like to invite to
              your organization.
            </p>

            {!!fields.length && (
              <div className="grid grid-cols-12 gap-2 items-start">
                <Label className="col-span-7">Email Address</Label>
                <Label className="col-span-4">Role</Label>
              </div>
            )}

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-12 gap-2 items-start"
              >
                {/* Email */}
                <div className="col-span-7">
                  <FormField
                    control={form.control}
                    name={`users.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="colleague@company.com"
                            className="bg-white h-10"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Role */}
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name={`users.${index}.role`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          disabled={loading}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white w-full !h-10">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="dev">Developer</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Remove */}
                <div className="col-span-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    disabled={loading}
                    onClick={() => remove(index)}
                  >
                    -
                  </Button>
                </div>
              </div>
            ))}

            <Button
              type="button"
              onClick={addNewUser}
              variant="outline"
              size="lg"
              className="flex items-center gap-1"
            >
              +<span>Add Member</span>
            </Button>
          </div>

          {/* Footer */}
          <div className="flex gap-4 px-6 py-4 border-t justify-between items-center">
            <Button
              className="px-3 w-20"
              variant="outline"
              size="lg"
              type="button"
              onClick={onBack}
              disabled={loading}
            >
              Back
            </Button>

            <Button
              className="px-3 w-20"
              size="lg"
              type="submit"
              disabled={loading}
            >
              Invite
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
