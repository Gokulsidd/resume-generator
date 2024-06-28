"use client";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchData } from "@/lib/helper";
import Link from "next/link";
import api from "@/app/utils/api";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";


const Font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const Candidates = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const [data, setData] = useState([]);
  const toast = useToast()

  useEffect(() => {
    const getData = async () => {
      const res = await fetchData("/form");
      setData(res);
    };

    getData();
  }, []);

  const handleAddCandidate = () => {
    router.push("dashboard/candidates/create");
  };

  const handleDeleteCandidate = async (id, name) => {
    try{
      api.delete('/form/'+id)
      toast({ title: `Deleted ${name}'s data`,  variant: "destructive",})
    }catch (error) {
      console.log(error)
    }
  }

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };


  return (
    <div className="w-full">
      <div className="p-4 shadow-md rounded-md w-[full] flex flex-col gap-y-3">
        <div className="flex flex-col px-3 gap-y-4 sm:flex-row lg:gap-x-6 gap-x-4 sm:items-center items-start justify-between">
          <div className="flex flex-row  gap-x-4  items-center">
            <h1
              className={cn(
                "text-[24px] leading-[32px] font-bold",
                Font.className
              )}
            >
              Candidates
            </h1>
            <p className="text-muted-foreground sm:w-[40px]">{`( ${data?.length} )`}</p>
          </div>
          <div className="flex flex-row gap-x-4 w-full">
            <Input
              type="text"
              placeholder="search"
              value={searchText}
              onChange={(e) => handleSearchTextChange(e)}
              className="w-3/4 md:w-full sm:w-auto lg:w-[400px]"
            />
            <DropdownMenu>
              <DropdownMenuTrigger className="flex w-1/4  items-center justify-center rounded-md outline-none focus:outline-none border border-gray-200 h-10 sm:w-10">
                <Image
                  src={"/filter-2.png"}
                  width={24}
                  height={24}
                  alt="filter"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  {/* {sortLabels.map((item) => {
                  return (
                    <DropdownMenuItem
                      onSelect={() => handleSortSelect(item)}
                      key={item}
                    >
                      {item}
                    </DropdownMenuItem>
                  );
                })} */}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            variant={"outline"}
            size={"lg"}
            className="outline-[#1DCE00] text-[#1DCE00] w-full sm:w-[150px]  lg:w-[200px]"
            onClick={handleAddCandidate}
          >
            Add Candidate
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[120px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => {
              return (
                <TableRow key={item._id} className="cursor-pointer">
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phoneNumber}</TableCell>
                  <div className="float-right">
                    <TableCell>
                      <Link rel="preload" as={"/dashboard/candidates/" + item._id} href={"/dashboard/candidates/" + item._id}>
                        <Button variant="default" size="sm" >
                          View
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteCandidate(item._id, item.fullName)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </div>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Toaster />
      </div>
    </div>
  );
};

export default Candidates;
