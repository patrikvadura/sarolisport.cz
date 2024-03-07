"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Navbar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarBrand, NavbarContent, NavbarItem, Image, Link, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { ThemeSwitcher } from "@/app/ui/ThemeSwitcher";

import { getPage } from "@/app/lib/api";

export default function Header() {
    const [pages, setPages] = React.useState([]);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [scrollPosition, setScrollPosition] = useState(0); // add this

    const { theme, setTheme } = useTheme()

    const toggleTheme = ():void => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    useEffect(() => {
        async function fetchPages() {
            const response = await getPage(undefined, ['coverImage']);
            setPages(response.data);
        }
        fetchPages();
    }, []);

    useEffect(() => {
        const updateScroll = () => {
            setScrollPosition(window.scrollY || document.documentElement.scrollTop);
        }
        window.addEventListener('scroll', updateScroll);
        return () => window.removeEventListener('scroll', updateScroll);
    }, []);

    return (
        <Navbar
            className={`
                bg-primary transition-all duration-300 ease-in-out 
                ${scrollPosition > 50 ? 'p-0 border-b-1' : 'p-2 border-none'}
            `}
            maxWidth="xl"
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarBrand>
                <Link href="/" className="text-black">
                    <Image
                        className={`
                            rounded-none w-[150px] transition duration-300 ease-in-out 
                            ${scrollPosition > 50 ? 'scale-90' : 'scale-100'}
                        `}
                        src={`/${theme === "dark" ? 'logo_vadura_color-secondary.svg' : 'logo_vadura_negative.svg'}`}
                        alt="Patrik Vaďura"
                    />
                </Link>
            </NavbarBrand>

            <ThemeSwitcher/>

            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="text-secondary"
            />

            <NavbarMenu className="flex flex-col justify-center items-center">
                {pages.map((page: any) => {
                    return (
                        <NavbarMenuItem key={page.id}>
                            <Link
                                href={`/${page.attributes.slug}`}
                                className="!text-h3 !font-bold text-primary">
                                {page.attributes.title}
                            </Link>
                        </NavbarMenuItem>
                    );
                })}
            </NavbarMenu>
        </Navbar>
    );
}
