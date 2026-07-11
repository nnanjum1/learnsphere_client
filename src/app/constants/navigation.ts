export interface NavLink {
    label: string;
    href: string;
}

export const publicNavLinks: NavLink[] = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Explore",
        href: "/courses",
    },
    {
        label: "About",
        href: "/about",
    },
    {
        label: "Contact",
        href: "/contact",
    },
];