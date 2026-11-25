"use client";

import { ChevronsUpDownIcon, LogOutIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { signOutAction } from "@/shared/actions/sign-out";
import type { PlanId } from "@/shared/constants/plans";
import SubscriptionButton from "./subscription-button";

export type ShellUser = {
  name: string;
  email: string;
  image: string | null;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

type UserMenuProps = ShellUser & {
  planId: PlanId;
};

const UserMenu = ({ name, email, image, planId }: UserMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center gap-2.5 rounded-md p-1.5 text-left transition-colors outline-none hover:bg-sidebar-item-hover focus-visible:bg-sidebar-item-hover focus-visible:shadow-none data-[state=open]:bg-sidebar-item-active">
        <Avatar className="size-7">
          {image && <AvatarImage src={image} alt="" />}
          <AvatarFallback className="bg-sidebar-item-active text-sidebar-fg-active">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs font-medium text-sidebar-fg-active">
            {name}
          </span>
          <span className="block truncate text-xs">{email}</span>
        </span>

        <ChevronsUpDownIcon className="size-icon-sm shrink-0" />
      </DropdownMenuTrigger>

      <DropdownMenuContent side="top" align="start" className="w-52">
        <DropdownMenuLabel>
          <span className="block truncate font-medium">{name}</span>
          <span className="block truncate font-regular text-fg-muted">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <SubscriptionButton planId={planId} />
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger" onSelect={() => signOutAction()}>
          <LogOutIcon />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
