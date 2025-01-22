"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import Link from "next/link";
import React, { useId } from "react";
import { Bot } from "lucide-react";
import { navbarItems } from "@/lib/constants";

const Header = React.memo(() => {
    const id = useId();

    return (
        <header className="flex w-full items-center justify-center">
            <Navbar shouldHideOnScroll className="w-full bg-primary text-white flex items-center justify-start ">
                <NavbarBrand className="flex items-center gap-2">
                    <Bot />
                    <p className="font-bold">Light Amazon</p>
                </NavbarBrand>

                <NavbarContent className="flex gap-4">
                    {navbarItems?.map(({ href, label }, index) => (
                        <NavbarItem key={index + "navItem" + id}>
                            <Link color="foreground" className="capitalize" href={href}>
                                {label}
                            </Link>
                        </NavbarItem>
                    ))}
                </NavbarContent>
            </Navbar>
        </header>
    );
});

export default Header;
