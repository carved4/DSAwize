"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { 
  Home, 
  PlayCircle, 
  BookOpen, 
  Github,
  Menu,
  X,
  Trophy,
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { themeConfig } from "@/lib/theme-config";

const navigation = [
  { 
    name: "Home", 
    href: "/", 
    icon: Home,
    description: "Get started with algorithm visualization"
  },
  { 
    name: "Playground", 
    href: "/playground", 
    icon: PlayCircle,
    description: "Visualize and understand algorithms"
  },
  { 
    name: "Practice", 
    href: "/practice", 
    icon: BookOpen,
    description: "Solve algorithm problems"
  }
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="relative h-8 w-8">
        <div className="absolute inset-0 rounded-lg bg-primary/20 animate-pulse" />
        <div className="absolute inset-[2px] rounded-lg bg-gradient-to-br from-violet-500 via-primary to-indigo-500" />
        <div className="absolute inset-0 rounded-lg ring-1 ring-primary/20" />
      </div>
      <span className="font-bold text-xl">DSA Wize</span>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center">
        {/* Desktop Navigation */}
        <div className="flex items-center justify-between w-full">
          {/* Left side with logo */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Center navigation items */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center space-x-2 text-sm font-medium transition-colors hover:text-foreground/80",
                      pathname === item.href
                        ? "text-foreground"
                        : "text-foreground/60"
                    )}
                  >
                    <Icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/carved4/DSAwize"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block"
            >
              <Button variant="ghost" size="icon" className="group">
                <Github className="h-5 w-5 group-hover:text-primary transition-colors" />
              </Button>
            </a>
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="flex flex-col space-y-6">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <Logo />
                </Link>
                <div className="flex flex-col space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "group flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
                          pathname === item.href ? "bg-accent" : "transparent"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <div className="flex flex-col">
                          <span>{item.name}</span>
                          <span className="text-xs text-muted-foreground">{item.description}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}