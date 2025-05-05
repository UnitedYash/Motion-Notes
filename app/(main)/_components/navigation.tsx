"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { UserItem } from "./user-item";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "./item";
import { toast } from "sonner";
import { DocumentList } from "./document-list";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TrashBox } from "./trash-box";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";

export const Navigation = () => {
    const settings = useSettings();
    const search = useSearch();
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const create = useMutation(api.documents.create);

    const isResizingRef = useRef(false);
    const sideBarRef = useRef<ElementRef<"aside">>(null);
    const navBarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);
    useEffect(() => {
        if(isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }
    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sideBarRef.current && navBarRef.current) {
            sideBarRef.current.style.width = `${newWidth}px`;
            navBarRef.current.style.setProperty("left", `${newWidth}px`);
            navBarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
        }

    }
    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    const resetWidth = () => {
        if (sideBarRef.current && navBarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sideBarRef.current.style.width= isMobile ? "100%" : "240px";
            navBarRef.current.style.setProperty("width",
                isMobile ? "0" : "calc(100% - 240px)"
            );
            navBarRef.current.style.setProperty("left",
                isMobile ? "100%" : "240px"
            );
            setTimeout(() => setIsResetting(false), 300);
        }
    }

    const collapse = () => {
        if (sideBarRef.current && navBarRef.current ) {
            setIsCollapsed(true);
            setIsResetting(true);

            sideBarRef.current.style.width = "0";
            navBarRef.current.style.setProperty("width", "100%");
            navBarRef.current.style.setProperty("left", "0");
            setTimeout(() => setIsResetting(false), 300);

        }
    };

    const handleCreate = () => {
        const promise = create({ title: "Untitled" });

        toast.promise(promise, {
            loading: "Creating new note",
            success: "New note created",
            error: "Failed to create new note"
        });
    };

    return (
        <>
            <aside
                ref={sideBarRef}
                className={cn(
                    "h-full group/sidebar bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0"
                )}
            >
                <div className={cn(`w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute
                        top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition`,
                        isMobile && 'opacity-100')} 
                onClick={collapse}
                role="button">
                    <ChevronsLeft className="w-6 h-6"/>
                </div>
                <div>
                    <UserItem />
                    <Item 
                        label="search"
                        icon={Search}
                        isSearch
                        onClick={search.onOpen}
                    />
                    <Item 
                        label="settings"
                        icon={Settings}
                        onClick={settings.onOpen}
                    />
                    <Item onClick={handleCreate} label="New Page" icon={PlusCircle}/>
                </div>
                <div className="mt-4">
                    <DocumentList />
                    <Item
                        onClick={handleCreate}
                        icon={Plus}
                        label="Add a page"
                    />
                    <Popover>
                        <PopoverTrigger className="w-full mt-4 ">
                            <Item label="trash" icon={Trash} />
                        </PopoverTrigger>
                        <PopoverContent side={isMobile ? "bottom" : "right"}
                            className="p-0 w-72"
                        >
                            <TrashBox />
                        </PopoverContent>
                    </Popover>
                </div>
                <div 
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100 
                    transition cursor-ew-resize absolute h-full w-1 bg-primary/10
                    right-0 top-0"
                />

            </aside>
            <div
                ref={navBarRef}
                className={cn(
                    "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                    isResetting && "left-0 w-full"
                )}
            >
                <nav className="bg-transparent px-3 py-2 w-full">
                    {isCollapsed && <MenuIcon className="w-6 h-6 text-muted-foreground" onClick={resetWidth} role="button"/>}
                </nav>
            </div>
        </>
        
    )
}