import { ModeToggle } from "../dark-mode-toggle";
import { AddNewHack } from "../dialog/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const Navbar = () => {
  return (
    <Card className="mt-5 p-0">
      <CardContent className="flex h-full items-center justify-between p-3">
        <AddNewHack
          button={
            <Button
              variant={"hack"}
              size={"lg"}
              className="flex items-center gap-x-1 font-bold"
            >
              <span className="text-xl">+</span>
              <div className="flex flex-col">
                <span>NEW</span>
                <span>HACK</span>
              </div>
            </Button>
          }
        />

        <h1 className="font-extrabold text-xl">Top 20 Hacks</h1>

        <div className="flex items-center gap-x-1 text-sm">
          <ModeToggle />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center text-xs font-bold">
            <span className="">BY</span>
            <span className="underline text-orange-600">SUNNY</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Navbar;
