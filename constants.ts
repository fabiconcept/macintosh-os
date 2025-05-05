export interface IconProps {
    id: string;
    src: string;
    alt: string;
    tooltip: string;
    action: () => void;
}

export const icons: IconProps[] = [
    {
        id: "icon-1",
        src: "/images/icons/finder.png",
        alt: "Finder",
        tooltip: "Finder",
        action: () => {}
    },
    {
        id: "icon-2",
        src: "/images/icons/launchpad.png",
        alt: "Launchpad",
        tooltip: "Launchpad",
        action: () => {}
    },
    {
        id: "icon-3",
        src: "/images/icons/notes.png",
        alt: "Notes",
        tooltip: "Notes",
        action: () => {}
    },
    {
        id: "icon-4",
        src: "/images/icons/terminal.png",
        alt: "Terminal",
        tooltip: "Terminal",
        action: () => {}
    },
    {
        id: "icon-5",
        src: "/images/icons/mail.png",
        alt: "Mail",
        tooltip: "Mail",
        action: () => {}
    },
    { 
        id: "icon-6",
        src: "/images/icons/settings.png",
        alt: "Settings",
        tooltip: "Settings",
        action: () => {}
    },
    {
        id: "icon-7",
        src: "/images/icons/spotify.png",
        alt: "Spotify",
        tooltip: "Spotify",
        action: () => {}
    }
]

export const permanentIcons: IconProps[] = [
    {
        id: "per-icon-1",
        src: "/images/icons/download.png",
        alt: "Download",
        tooltip: "Download",
        action: () => {}
    },
    {
        id: "per-icon-2",
        src: "/images/icons/bin.png",
        alt: "Bin",
        tooltip: "Bin",
        action: () => {}
    }
]
