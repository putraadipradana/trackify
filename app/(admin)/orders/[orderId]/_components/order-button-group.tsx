"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconArchive,
  IconArrowLeft,
  IconCalendarPlus,
  IconClock,
  IconDots,
  IconFilterPlus,
  IconMail,
  IconNote,
  IconPlus,
  IconStar,
  IconTag,
  IconTrash,
} from "@tabler/icons-react";
import { deleteOrderFn } from "@/server/orders";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function OrderButtonGroup({ id }: { id: string }) {
  const [label, setLabel] = React.useState("personal");
  const router = useRouter();

  async function DeleteOrder(id: string) {
    try {
      const response = await deleteOrderFn(id);

      if (response.success) {
        toast.success(response.message);
        router.push("/orders");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-between">
      <ButtonGroup>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Go Back"
          onClick={() => window.history.back()}
        >
          <IconArrowLeft />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroup className="sm:flex hidden">
          <Button variant="outline" size="sm">
            <IconStar />
            Favorite
          </Button>
          <Button variant="outline" size="sm">
            <IconNote />
            Notes
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="sm">
            <IconArchive />
            Archive
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="More Options"
                />
              }
            >
              <IconDots />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <IconMail />
                  Mark as Read
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconPlus />
                  Add Material
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconArchive />
                  Archive
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <IconClock />
                  Snooze
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconCalendarPlus />
                  Add to Calendar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconFilterPlus />
                  Add to List
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <IconTag />
                    Label As...
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={label}
                      onValueChange={setLabel}
                    >
                      <DropdownMenuRadioItem value="personal">
                        Personal
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="work">
                        Work
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="other">
                        Other
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => DeleteOrder(id)}
                >
                  <IconTrash />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </ButtonGroup>
    </div>
  );
}
