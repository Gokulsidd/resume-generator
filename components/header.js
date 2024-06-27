
'use client'
import Link from "next/link";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/app/contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-full h-[60px] flex flex-row items-center justify-end gap-x-4 shadow-md bg-white z-40">
      {user?.role === "admin" && (
        <Link href={"/dashboard"}>
          <Button variant="ghost" size="sm">
            Dashboard
          </Button>
        </Link>
      )}
      <div className="mr-10">
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <Button variant='outline' size='sm'>{'Hi ' + user?.username[0].toUpperCase()+ user?.username.slice(1)}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="cursor-pointer">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
