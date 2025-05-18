import { Button, Icon } from "@reloop/ui";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@reloop/ui/components/tabs";
export const LeftSidebar = () => {
  return (
    <div className=" h-[calc(100dvh-48px)] max-w-xs w-full border-l border-dashed ">
      <div className="border-b border-dashed p-4">
        <Button className="w-full" size="sm">
          <Icon name="play" />
          <p>Preview</p>
        </Button>
      </div>

      <div>
        <Tabs defaultValue="design">
          <div className="border-b px-4 py-2 border-dashed">
            <TabsList className="bg-white">
              <TabsTrigger
                value="design"
                className="data-[state=active]:bg-sidebar-accent shadow-none"
              >
                <Icon name="brush" />
                Design
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="data-[state=active]:bg-sidebar-accent shadow-none w-full"
              >
                <Icon name="coding" />
                Code
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="design">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="code">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
