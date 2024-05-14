"use client";

import { CreditCard, LogOut, PlusCircle, Settings2, User } from "lucide-react";
import { signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadLink from "@/components/blocks/LoadLink";
import { UserData, UserProfileData } from "../models/login/datatype";
import { DEFAULT_FIRST_NAME, DEFAULT_LAST_NAME } from "@/lib/constants/generic";

interface LoggedInUser {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  profile?: {
    active_role?: string;
    active_organization?: {
      id?: number;
      name?: string;
      plan?: string;
    };
    default_organization?: { id?: number; name?: string; plan?: string };
  };
}

export default function PrivateNav({ user }: { user: UserData | undefined }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='relative h-11 w-1h-11 p-2 rounded-full bg-secondary hover:bg-secondary-foreground  '
        >
          <Avatar className='h-8 w-8'>
            <AvatarImage src={"/assets/images/mascot.webp"} alt='@shadcn' />
            <AvatarFallback>{user?.profile?.first_name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56 border-border-dashboard'
        align='end'
        forceMount
      >
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {user?.profile?.first_name || DEFAULT_FIRST_NAME}{" "}
              {user?.profile?.last_name || DEFAULT_LAST_NAME}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {}
          <LoadLink href={"/profile"} prefetch={false}>
            <DropdownMenuItem>
              <Settings2 className='mr-2 h-4 w-4' />
              <span>Profile</span>
            </DropdownMenuItem>
          </LoadLink>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
