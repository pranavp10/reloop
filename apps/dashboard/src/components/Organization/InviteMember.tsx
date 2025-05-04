"use client";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@reloop/ui/components/form";
import { Input } from "@reloop/ui/components/input";
import { Button } from "@reloop/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@reloop/ui/components/select";
import { CircleMinus, CirclePlus } from "lucide-react";
import { Label } from "@reloop/ui/components/label";

const userSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  role: z.enum(["dev", "marketing", "admin"]),
});

const formSchema = z.object({
  users: z.array(userSchema).min(1, { message: "Add at least one user" }),
});

export const InviteMember = ({ onBack }: { onBack: () => void }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      users: [
        {
          email: "",
          role: "dev",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "users",
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      console.log("Inviting members:", data.users);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Team members invited successfully!");

      form.reset({
        users: [
          {
            email: "",
            role: "admin",
          },
        ],
      });
    } catch (error) {
      toast.error("Failed to invite team members");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addNewUser = () => {
    append({
      email: "",
      role: "admin",
    });
  };

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
                <div className="col-span-7">
                  <FormField
                    control={form.control}
                    name={`users.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="colleague@company.com"
                            disabled={loading}
                            className="bg-white h-10"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                <div className="col-span-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => remove(index)}
                    disabled={loading}
                  >
                    <CircleMinus
                      size={18}
                      className="text-gray-500 hover:text-red-500"
                    />
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
              <CirclePlus size={16} />
              <span>Add Member</span>
            </Button>
          </div>
          <div className="flex gap-4 px-6 py-4 border-t justify-between items-center">
            <Button
              className="px-3 w-20"
              variant="outline"
              size="lg"
              onClick={onBack}
              type="button"
            >
              Back
            </Button>
            <Button className="px-3 w-20" size="lg" type="submit">
              Invite
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
