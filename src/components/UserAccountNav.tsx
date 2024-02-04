"use client";

import { User } from "@/payload-types";
import { FC } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

type UserAccountNavProps = {
  user: User;
};

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  const { mutate: signOut, isLoading } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant="ghost" size="sm" className="relative">
          {isLoading ? (
            <>
              Logout <Loader2 className="ml-2 animate-spin text-primary" />
            </>
          ) : (
            "My Account"
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 bg-background" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="text-sm font-medium">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/sell">Seller Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
