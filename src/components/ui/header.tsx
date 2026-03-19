"use client";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function Header1() {
    const navigationItems = [
        {
            title: "Products",
            description: "Explore our steel product range",
            items: [
                {
                    title: "TMT Steel",
                    href: "/products",
                },
                {
                    title: "Structural Steel",
                    href: "/products",
                },
                {
                    title: "Wire Rods",
                    href: "/products",
                },
                {
                    title: "Steel Plates",
                    href: "/products",
                },
            ],
        },
        {
            title: "Company",
            description: "Learn more about us",
            items: [
                {
                    title: "About us",
                    href: "/#about",
                },
                {
                    title: "Our Services",
                    href: "/#services",
                },
                {
                    title: "Testimonials",
                    href: "/#testimonials",
                },
                {
                    title: "Contact us",
                    href: "/#contact",
                },
            ],
        },
    ];

    const [isOpen, setOpen] = useState(false);
    return (
        <header className="w-full z-40 fixed top-0 left-0 bg-white border-b border-gray-200 shadow-sm">
            <div className="container relative mx-auto min-h-28 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
                <div className="justify-start items-center gap-4 flex flex-row">
                    <Link href="/" className="flex items-center gap-2">
                        <Image 
                            src="/logo.png" 
                            alt="Radhey Raman Steels Logo" 
                            width={120} 
                            height={120}
                            className="w-auto h-24"
                            priority
                        />
                    </Link>
                    <NavigationMenu className="hidden lg:flex justify-start items-start">
                        <NavigationMenuList className="flex justify-start gap-4 flex-row">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    <NavigationMenuTrigger className="font-medium text-sm text-darkGray">
                                        {item.title}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="!w-[450px] p-4">
                                                <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div className="flex flex-col">
                                                            <p className="text-base font-semibold text-darkGray">{item.title}</p>
                                                            <p className="text-gray-600 text-sm">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <Button size="sm" className="mt-10">
                                                            Learn more
                                                        </Button>
                                                    </div>
                                                    <div className="flex flex-col text-sm h-full justify-end">
                                                        {item.items?.map((subItem) => (
                                                            <NavigationMenuLink
                                                                href={subItem.href}
                                                                key={subItem.title}
                                                                className="flex flex-row justify-between items-center hover:bg-gray-100 py-2 px-4 rounded text-darkGray"
                                                            >
                                                                <span>{subItem.title}</span>
                                                                <MoveRight className="w-4 h-4 text-gray-600" />
                                                            </NavigationMenuLink>
                                                        ))}
                                                    </div>
                                                </div>
                                            </NavigationMenuContent>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex lg:justify-center">
                    <p className="font-bold text-lg text-black">Radhey Raman Steel</p>
                </div>
                <div className="flex justify-end w-full gap-4">
                    <Button variant="ghost" className="hidden md:inline text-darkGray">
                        Book a quote
                    </Button>
                    <div className="border-r hidden md:inline border-gray-300"></div>
                </div>
                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    {isOpen && (
                        <div className="absolute top-20 border-t border-gray-200 flex flex-col w-full right-0 bg-white shadow-lg py-4 container gap-8">
                            {navigationItems.map((item) => (
                                <div key={item.title}>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-lg text-darkGray font-semibold">{item.title}</p>
                                        {item.items &&
                                            item.items.map((subItem) => (
                                                <Link
                                                    key={subItem.title}
                                                    href={subItem.href}
                                                    className="flex justify-between items-center text-gray-600"
                                                >
                                                    <span>
                                                        {subItem.title}
                                                    </span>
                                                    <MoveRight className="w-4 h-4 stroke-1" />
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export { Header1 };
