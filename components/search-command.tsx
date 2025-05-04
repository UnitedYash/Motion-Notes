"use client";

import { useEffect, useState } from "react";
import { File } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";


export const SearchCommand = () => {
    const { user } = useUser();
    const router = useRouter();
    const documents = useQuery();
}