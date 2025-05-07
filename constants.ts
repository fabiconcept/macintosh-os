export const BOX_WIDTH = 550;
export const BOX_HEIGHT = 400;

export enum WindowType {
    Finder = "finder",
    Launchpad = "launchpad",
    Terminal = "terminal",
    Mail = "mail",
    Safari = "safari",
    Settings = "settings",
    Spotify = "spotify",
    Downloads = "downloads",
    Bin = "bin",
    Photos = "photos",
}

export interface IconProps {
    id: string;
    src: string;
    alt: string;
    tooltip: string;
    windowType: WindowType;
}

export const icons: IconProps[] = [
    {
        id: "icon-1",
        src: "/images/icons/finder.png",
        alt: "Finder",
        tooltip: "Finder",
        windowType: WindowType.Finder,
    },
    {
        id: "icon-2",
        src: "/images/icons/launchpad.png",
        alt: "Launchpad",
        tooltip: "Launchpad",
        windowType: WindowType.Launchpad,
    },
    {
        id: "icon-3",
        src: "/images/icons/photos.png",
        alt: "Photos",
        tooltip: "Photos",
        windowType: WindowType.Photos,
    },
    {
        id: "icon-4",
        src: "/images/icons/terminal.png",
        alt: "Terminal",
        tooltip: "Terminal",
        windowType: WindowType.Terminal,
    },
    {
        id: "icon-5",
        src: "/images/icons/mail.png",
        alt: "Mail",
        tooltip: "Mail",
        windowType: WindowType.Mail,
    },
    { 
        id: "icon-6",
        src: "/images/icons/settings.png",
        alt: "Settings",
        tooltip: "Settings",
        windowType: WindowType.Settings,
    },
    {
        id: "icon-7",
        src: "/images/icons/spotify.png",
        alt: "Spotify",
        tooltip: "Spotify",
        windowType: WindowType.Spotify,
    }
]

export const permanentIcons: IconProps[] = [
    {
        id: "per-icon-1",
        src: "/images/icons/download.png",
        alt: "Downloads",
        tooltip: "Projects",
        windowType: WindowType.Downloads,
    },
    // {
    //     id: "per-icon-2",
    //     src: "/images/icons/bin.png",
    //     alt: "Bin",
    //     tooltip: "Bin",
    //     windowType: WindowType.Bin,
    // }
]

export type QuoteDictionary = {
    [key: string]: string[];
};

export const quotesByChar: QuoteDictionary = {
    'F': [
        "Fascinating!",
        "Fierce!",
        "Fantastic!",
        "Formidable!",
        "Flawless!",
        "Fearless!",
        "Fabulous!",
        "Foremost!",
        "Flourishing!",
        "Futuristic!"
    ],
    'a': [
        "Amazing!",
        "Astonishing!",
        "Awesome!",
        "Admirable!",
        "Authentic!",
        "Astute!",
        "Affirming!",
        "Acclaimed!",
        "Artistic!",
        "Adventurous!"
    ],
    'V': [
        "Victorious!",
        "Valiant!",
        "Valuable!",
        "Venerable!",
        "Vibrant!",
        "Versatile!",
        "Visionary!",
        "Vigorous!",
        "Virtuous!",
        "Voluminous!"
    ],
    'o': [
        "Outstanding!",
        "Original!",
        "Optimal!",
        "Opulent!",
        "Observant!",
        "Omnipotent!",
        "Opportunistic!",
        "Optimistic!",
        "Overachieving!",
        "Otherworldly!"
    ],
    'u': [
        "Unmatched!",
        "Unbeatable!",
        "Ultimate!",
        "Unreal!",
        "Unforgettable!",
        "Unique!",
        "Uplifting!",
        "Unstoppable!",
        "Unparalleled!",
        "Unyielding!"
    ],
    'R': [
        "Remarkable!",
        "Radiant!",
        "Revolutionary!",
        "Royal!",
        "Respected!",
        "Resourceful!",
        "Resilient!",
        "Refreshing!",
        "Riveting!",
        "Revered!"
    ],
    'T': [
        "Tremendous!",
        "Terrific!",
        "Top-notch!",
        "Talented!",
        "Triumphant!",
        "Tenacious!",
        "Trailblazing!",
        "Transformative!",
        "Transcendent!",
        "Timeless!"
    ],
    'C': [
        "Captivating!",
        "Charismatic!",
        "Commanding!",
        "Courageous!",
        "Creative!",
        "Compelling!",
        "Confident!",
        "Celebrated!",
        "Cultured!",
        "Classy!"
    ],
    'H': [
        "Heroic!",
        "Honorable!",
        "Humble!",
        "High-caliber!",
        "Hypnotic!",
        "Historic!",
        "Harmonious!",
        "Heartening!",
        "Heavyweight!",
        "Hallmark!"
    ],
    'K': [
        "Kingly!",
        "Keen!",
        "Knockout!",
        "Knowledgeable!",
        "Kaleidoscopic!",
        "Key!",
        "Kind-hearted!",
        "Killer!",
        "Kinetic!",
        "Knightly!"
    ],
    'w': [
        "Wonderful!",
        "Wise!",
        "Winning!",
        "World-class!",
        "Wholesome!",
        "Wondrous!",
        "Worthy!",
        "Well-respected!",
        "Witty!",
        "Wicked!"
    ],
    'A': [
        "Astounding!",
        "Astonishing!",
        "Acclaimed!",
        "Audacious!",
        "Admirable!",
        "Ambitious!",
        "Authentic!",
        "Authoritative!",
        "Awe-inspiring!",
        "Absolute!"
    ],
    'J': [
        "Jaw-dropping!",
        "Jubilant!",
        "Judicious!",
        "Just!",
        "Jazzy!",
        "Jovial!",
        "Joyous!",
        "Journeyman!",
        "Justified!",
        "Jewel-like!"
    ],
    'B': [
        "Brilliant!",
        "Bold!",
        "Breathtaking!",
        "Boundless!",
        "Balanced!",
        "Benevolent!",
        "Beloved!",
        "Beneficial!",
        "Brave!",
        "Blazing!"
    ],
    'i': [
        "Incredible!",
        "Impressive!",
        "Inspiring!",
        "Illuminating!",
        "Ingenious!",
        "Indomitable!",
        "Illustrious!",
        "Inventive!",
        "Intuitive!",
        "Iconic!"
    ]
};

export interface LaunchpadApp {
    id: string;
    src: string;
    alt: string;
    title: string;
    url: string;
}

export const launchpadApps: LaunchpadApp[] = [
    {
        id: "launchpad-app-1",
        src: "/images/icons/facebook.png",
        alt: "Facebook",
        title: "Facebook",
        url: "https://www.facebook.com/fabiconcept",
    },
    {
        id: "launchpad-app-2",
        src: "/images/icons/instagram.png",
        alt: "Instagram",
        title: "Instagram",
        url: "https://www.instagram.com/fabiconcept_ng",
    },
    {
        id: "launchpad-app-3",
        src: "/images/icons/x.png",
        alt: "X",
        title: "X",
        url: "https://www.x.com/goat_h2o",
    },
    {
        id: "launchpad-app-4",
        src: "/images/icons/whatsapp.png",
        alt: "WhatsApp",
        title: "WhatsApp",
        url: "https://wa.link/78bp13",
    },
    {
        id: "launchpad-app-5",
        src: "/images/icons/github.png",
        alt: "GitHub",
        title: "GitHub",
        url: "https://www.github.com/fabiconcept",
    },
    {
        id: "launchpad-app-6",
        src: "/images/icons/linkedin.png",
        alt: "LinkedIn",
        title: "LinkedIn",
        url: "https://www.linkedin.com/fabiconcept/",
    },
    {
        id: "launchpad-app-7",
        src: "/images/icons/dribble.png",
        alt: "Dribbble",
        title: "Dribbble",
        url: "https://www.dribbble.com/fabiconcept",
    },
    {
        id: "launchpad-app-8",
        src: "/images/icons/secret.png",
        alt: "Secret",
        title: "Secret Room",
        url: "https://secret-room-orpin.vercel.app/ginvite/global-98cd99b7-bd7b-4942-a6b0-c16feff7f39b",
    },
    {
        id: "launchpad-app-9",
        src: "/images/icons/safari.png",
        alt: "Safari",
        title: "Safari",
        url: "https://fabiconcept.online/",
    }
]

interface TopArtist {
    id: string;
    src: string;
    alt: string;
    name: string;
    url: string;
}

export const topArtists: TopArtist[] = [
    {
        id: "top-artist-1",
        src: "/images/assets/kenny.jpeg",
        alt: "Kungfu Kenny",
        name: "Kendrick Lamar",
        url: "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg?si=fdf007d859194725",
    },
    {
        id: "top-artist-2",
        src: "/images/assets/jev.jpeg",
        alt: "Jev",
        name: "Jev.",
        url: "https://open.spotify.com/artist/6OmxkansdRyVTvo6BpZzKF?si=2e8744e7c03044b0",
    },
    {
        id: "top-artist-3",
        src: "/images/assets/don.jpeg",
        alt: "Don",
        name: "Don Toliver",
        url: "https://open.spotify.com/artist/4Gso3d4CscCijv0lmajZWs?si=78eeddd2a6344e2d",
    },
    {
        id: "top-artist-4",
        src: "/images/assets/black.jpeg",
        alt: "Black Sabbath",
        name: "Black Sabbath",
        url: "https://open.spotify.com/artist/5M52tdBnJaKSvOpJGz8mfZ?si=36559d566a074f2d"
    },
    {
        id: "top-artist-5",
        src: "/images/assets/rema.jpeg",
        alt: "HIM",
        name: "Rema",
        url: "https://open.spotify.com/artist/46pWGuE3dSwY3bMMXGBvVS?si=b5d8260d8da2405d"
    },
    {
        id: "top-artist-6",
        src: "/images/assets/ye.jpeg",
        alt: "Ye",
        name: "Kanye West",
        url: "https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x?si=743578ae6af2453b"
    },
    {
        id: "top-artist-7",
        src: "/images/assets/zay.jpeg",
        alt: "Zay",
        name: "Zay Dante",
        url: "https://open.spotify.com/artist/6ZnL56xQE3lDTPRv6d0DIX?si=da981a43f4a644fd"
    },
    {
        id: "top-artist-8",
        src: "/images/assets/denzel.webp",
        alt: "Denzel",
        name: "Denzel Kurry",
        url: "https://open.spotify.com/artist/6fxyWrfmjcbj5d12gXeiNV?si=76d25ec8d23d472b"
    },
    {
        id: "top-artist-9",
        src: "/images/assets/carti.jpeg",
        alt: "Carti",
        name: "Playboi Carti",
        url: "https://open.spotify.com/artist/699OTQXzgjhIYAHMy9RyPD?si=efb750b7d60c49a3"
    },
    {
        id: "top-artist-10",
        src: "/images/assets/tyler.jpeg",
        alt: "Tyler",
        name: "Tyler, The Creator",
        url: "https://open.spotify.com/artist/4V8LLVI7PbaPR0K2TGSxFF?si=f35e378d548743d1"
    }
]

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
        url: "https://landing-page-7cc2.vercel.app/",
    }
]

interface CSSArt {
    id: string;
    src: string;
    alt: string;
    name: string;
    url: string;
}

export const cssArt: CSSArt[] = [
    {
        id: "css-art-1",
        src: "https://raw.githubusercontent.com/fabiconcept/css-art/main/snapshot/screenshot005.jpg",
        alt: "CSS Art",
        name: "Monster 01",
        url: "https://raw.githack.com/fabiconcept/css-art/main/monster01.html",
    },
    {
        id: "css-art-2",
        src: "https://raw.githubusercontent.com/fabiconcept/css-art/main/snapshot/screenshot002.jpg",
        alt: "CSS Art",
        name: "Boy from Tutorial",
        url: "https://raw.githack.com/fabiconcept/css-art/main/boyFromTutorial.html",
    },
    {
        id: "css-art-3",
        src: "https://raw.githubusercontent.com/fabiconcept/css-art/main/snapshot/screenshot001.jpg",
        alt: "CSS Art",
        name: "Cool Old Guy",
        url: "https://raw.githack.com/fabiconcept/css-art/main/figure01.html",
    },
    {
        id: "css-art-4",
        src: "https://raw.githubusercontent.com/fabiconcept/css-art/main/snapshot/screenshot004.jpg",
        alt: "CSS Art",
        name: "Sad Hopper",
        url: "https://raw.githack.com/fabiconcept/css-art/main/hopper.html",
    },
    {
        id: "css-art-5",
        src: "https://raw.githubusercontent.com/fabiconcept/css-art/main/snapshot/screenshot003.jpg",
        alt: "CSS Art",
        name: "Monster 02",
        url: "https://raw.githack.com/fabiconcept/css-art/main/figure02.html",
    },
    {
        id: "css-art-6",
        src: "https://raw.githubusercontent.com/fabiconcept/css-art/main/snapshot/Screenshot%202025-05-06%20at%2018.48.22.png",
        alt: "CSS Art",
        name: "Among Us",
        url: "https://rawcdn.githack.com/fabiconcept/css-art/396cb3c7bae488b5ad82ae703c816f6c4810aed4/among-us.html",
    }
]

interface GraphicDesign {
    id: string;
    src: string;
    alt: string;
    name: string;
    url: string;
}

export const graphicDesign: GraphicDesign[] = [
    {
        id: "grid-d",
        src: "/images/photos/pic01.jpg",
        alt: "Graphic Design 01",
        name: "Flyer Design",
        url: "https://www.instagram.com/p/Ceg8GHjLKQF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
        id: "grid-c",
        src: "/images/photos/pic03.jpg",
        alt: "Graphic Design 03",
        name: "Jagaban",
        url: "https://www.instagram.com/p/CeuKupSrg3s/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
        id: "grid-b",
        src: "/images/photos/pic04.jpg",
        alt: "Graphic Design 04",
        name: "Cisca Cakes",
        url: "https://www.instagram.com/p/CeuLnaNM-P6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
        id: "grid-a",
        src: "/images/photos/pic02.jpg",
        alt: "Graphic Design 02",
        name: "The Fallen One",
        url: "https://www.instagram.com/p/Ce5pDxura_0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    }
]
