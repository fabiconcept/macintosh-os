export interface Project {
    id: string;
    src: string;
    alt: string;
    name: string;
    type: string;
    url: string;
    isFavorite?: boolean;
}

export const projects: Project[] = [
    {
        id: "project-1",
        src: "https://pickholder.sirv.com/Images/aism.png",
        alt: "AISM",
        name: "American International School of Medicine",
        type: "Education",
        url: "https://aism-edu.vercel.app/",
    },
    {
        id: "project-2",
        src: "https://pickholder.sirv.com/Images/thumbnail-main.png",
        alt: "Secret room",
        name: "Secret Room",
        type: "Personal Project",
        url: "https://secret-room-orpin.vercel.app",
    },
    {
        id: "project-3",
        src: "https://pickholder.sirv.com/Images/photobooth.png",
        alt: "Photobooth",
        name: "Photobooth",
        type: "Personal Project",
        url: "https://photobooth-alpha.vercel.app",
    },
    {
        id: "project-4",
        src: "https://pickholder.sirv.com/Images/my-linktree.png",
        alt: "My Linktree",
        name: "My Linktree",
        type: "Personal Project",
        url: "https://mylinks.fabiconcept.online",
    },
    {
        id: "project-5",
        src: "https://pickholder.sirv.com/Images/Screenshot%202025-04-07%20at%2010.54.35.png",
        alt: "Weather App",
        name: "Weather App",
        type: "Personal Project",
        url: "https://weather-app-esa.vercel.app",
    },
    {
        id: "project-6",
        src: "https://pickholder.sirv.com/Images/Web%20capture_16-12-2023_14436_localhost.jpeg",
        alt: "Website",
        name: "Wilkinson & Regis Website Project",
        type: "Website",
        url: "https://landing-page-7cc2.vercel.app/",
    },
    {
        id: "project-7",
        src: "https://pickholder.sirv.com/Images/Web%20capture_26-6-2023_21655_www.offrcloud.com.jpeg",
        alt: "Website",
        name: "Offrcloud Website Project",
        type: "Website",
        url: "https://landing-page-ten-rose.vercel.app/",
    }
]
