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
        name: "My Current Resume 😅.pdf",
        icon: "/images/icons/pdf.png",
        downloadable: true,
        downloadURL: "https://pickholder.sirv.com/folder/fabiconcept_cv.pdf"
    },
    {
        id: "trash-2",
        name: "My Old Resume 👴🏾.pdf",
        icon: "/images/icons/pdf.png",
        downloadable: true,
        downloadURL: "https://pickholder.sirv.com/folder/Favour%20Ajokubi.docx.pdf"
    },
    {
        id: "trash-3",
        name: "Untitled 01.png",
        icon: "https://pickholder.sirv.com/Images/Untitled50.png",
        downloadable: true,
        downloadURL: "https://pickholder.sirv.com/Images/Untitled50.png" 
    },
    {
        id: "trash-4",
        name: "Untitled 02.png",
        icon: "https://pickholder.sirv.com/Images/icon.jpg",
        downloadable: true,
        downloadURL: "https://pickholder.sirv.com/Images/CyberGhost.png"
    }
]