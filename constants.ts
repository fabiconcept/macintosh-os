export const BOX_WIDTH = 550;
export const BOX_HEIGHT = 400;

export enum WindowType {
    Finder = "finder",
    Launchpad = "launchpad",
    Notes = "notes",
    Terminal = "terminal",
    Mail = "mail",
    Safari = "safari",
    Settings = "settings",
    Spotify = "spotify",
    Downloads = "downloads",
    Bin = "bin",
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
        src: "/images/icons/notes.png",
        alt: "Notes",
        tooltip: "Notes",
        windowType: WindowType.Notes,
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
        alt: "Download",
        tooltip: "Download",
        windowType: WindowType.Downloads,
    },
    {
        id: "per-icon-2",
        src: "/images/icons/bin.png",
        alt: "Bin",
        tooltip: "Bin",
        windowType: WindowType.Bin,
    }
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