import Image from "next/image";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

export const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light900_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="absolute ml-3 cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search globally"
          defaultValue=""
          className="paragraph-regular pl-12 no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
};
