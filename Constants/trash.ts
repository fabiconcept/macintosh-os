export interface Trash {
    id: string;
    name: string;
    icon: string;
    downloadable: boolean;
    downloadURL?: string;
}

export const trash: Trash[] = [
    {
        id: "trash-1",
        name: "My resume",
        icon: "/images/icons/pdf.png",
        downloadable: true,
        downloadURL: "https://pickholder.sirv.com/folder/Favour%20Ajokubi.docx.pdf"
    }
]