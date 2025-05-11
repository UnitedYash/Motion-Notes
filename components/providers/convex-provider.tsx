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
    // okay now rebuild, ithink we have problems with using clerk in convex, still same error do F1 > restart TS server
    //ok I did it wait rebuild same error ? wait its fixed, omg. yep some implementation issues :^ damn :D 
    //thanks a lot
    return (
        
     
            <ConvexProviderWithClerk
            useAuth={useAuth}
            client={convex}

            >
                {children}
            </ConvexProviderWithClerk>
    )

}
