import { Button } from "@reloop/ui";
import { Input } from "@reloop/ui/components/input";
import { Label } from "@reloop/ui/components/label";
import { useQueryState } from "nuqs";

export const AddOrgName = ({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: () => void;
}) => {
  const [organizationName, setorganizationName] = useQueryState("orgName", {
    defaultValue: "",
  });

  return (
    <>
      <div className="bg-white p-6">
        <p className="text-2xl font-medium">Create Organization</p>
      </div>
      <div className="grid gap-7 pt-7 pb-7 px-6 border-t">
        <p className="text-sm">
          Enter the email addresses of the people you'd like to invite to your
          organization.
        </p>
        <div className="grid gap-3">
          <Label htmlFor="name" className="text-right">
            Organization Name
          </Label>
          <Input
            className="bg-white h-11"
            id="name"
            value={organizationName}
            onChange={(e) => setorganizationName(e.target.value.trim())}
          />
        </div>
      </div>
      <div className="flex gap-4 px-6 py-4 border-t justify-between items-center">
        <Button
          className="px-3 w-20"
          variant="outline"
          size="lg"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button className="px-3 w-20" size="lg" onClick={onCreate}>
          Create
        </Button>
      </div>
    </>
  );
};
