"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api"; 
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function DocumentsPage () {
    const router = useRouter();
    const { user } = useUser(); // okay so kill all terminals and open a new one, give me rw access
    //you should have terminal access now no its still same
    //check bash shared, open one again, should be here now yes but i dont have access okay run the dev server
    //should I run the backend as well? yea, ok I ran dev what is the route of here, its marketing page.tsx no i mean /documents ?
    //in documents it should just be page.tsx, okay but what is its URL, /documents, its not working, cann you send ss in discord
    //cuz it works for me its redirecting me to / immediately, yes it should do that if user not logged in, oh okay give me some credentials then
    //just login with github, okay just login and go to /documents i ll check terminal, ok I did, okay now build it and go to same route again
    //ok doing it in the other terminal, I dont use packageName anywhere, its only in 301.js open it pls, ok opened
    // i dont see it
    //https://vscode.dev/github/UnitedYash/yash-notes/blob/main/.next/server/chunks/301.js copy this can you paste that line includes packageName
    //I send it on discord it looksk weird okay, yes its related with clerk, yea I tried to reinstall clerk still had same error w8 You've added multiple <ClerkProvider> components in your React component tree. Wrap your components in a single <ClerkProvider>.
    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create({ title: "Untitled"})
        .then((documentId) => router.push(`/documents/${documentId}`));
        toast.promise(promise, {
            loading: "Creating a new Note",
            success: "New note created",
            error: "Failed to create new note"
        })
    }

    return ( 
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image 
                src="/empty.png"
                height="300"
                width="300"
                alt="empty"
                className="dark:hidden"
            />
            <Image 
                src="/empty-dark.png"
                height="300"
                width="300"
                alt="empty"
                className="hidden dark:block"
            />
            <h2 className="text-lg font-medium">
                Welcome to {user?.firstName}&apos;s Motion
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2"/>
                Create a Note
            </Button>
        </div>
     );
}
