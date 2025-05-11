"use client";
import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/clerk-react";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
  }
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);


export const ConvexClientProvider = ({
    children
}: {
    children: ReactNode;
}) => {
    return (
        
     
            <ConvexProviderWithClerk
            useAuth={useAuth}
            client={convex}

            >
                {children}
            </ConvexProviderWithClerk>
    )

}
