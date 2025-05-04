import { Dialog, DialogContent } from "@reloop/ui/components/dialog";
import { useQueryState } from "nuqs";
import { AddOrgName } from "./AddOrgName";
import { InviteMember } from "./InviteMember";

interface AddOrganizationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

type OrgStep = "invite" | null;

export const AddOrganization: React.FC<AddOrganizationProps> = ({
  open,
  setOpen,
}) => {
  const [organizationName, setOrganizationName] = useQueryState("orgName");
  const [orgStep, setOrgStep] = useQueryState("orgStep");
  const isInviteStep = orgStep === "invite";

  const handleCloseDialog = (): void => {
    setOrganizationName(null);
    setOrgStep(null);
    setOpen(false);
  };

  const onCreate = (): void => {
    if (organizationName) {
      setOrgStep("invite" as OrgStep);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen: boolean) => {
        if (!isOpen) {
          setOrganizationName(null);
          setOrgStep(null);
        }
        setOpen(isOpen);
      }}
      defaultOpen={open}
    >
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-muted">
        <div>
          {isInviteStep ? (
            <InviteMember
              onBack={() => {
                if (isInviteStep) setOrgStep(null);
              }}
            />
          ) : (
            <AddOrgName onClose={handleCloseDialog} onCreate={onCreate} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
