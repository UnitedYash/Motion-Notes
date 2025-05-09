"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import {useCreateBlockNote} from "@blocknote/react";
import "@blocknote/core/style.css";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";


interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean; 
}

const Editor = ({
    onChange,
    initialContent,
    editable
}: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        });
        return response.url;
    };

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[]: undefined,
        uploadFile: handleUpload
    });

    return (
        <div>
            <BlockNoteView 
                editable={editable}
                editor={editor}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                onChange={() => {
                    const content = JSON.stringify(editor.document, null, 2)
                    onChange(content)
                  }}
            />
        </div>
    )
};

export default Editor;
