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
    },
    {
        id: "trash-2",
        name: "Untitled 01",
        icon: "https://pickholder.sirv.com/Images/Untitled50.png",
        downloadable: true,
        downloadURL: "https://pickholder.sirv.com/Images/Untitled50.png"
    },
    {
        id: "trash-3",
        name: "Untitled 02",
        icon: "https://pickholder.sirv.com/Images/CyberGhost.png",
        downloadable: true,
        downloadURL: "https://pickholder.sirv.com/Images/CyberGhost.png"
    }
]