'use client';

import React from 'react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

/* ──────────────────────────────────────────────── */
/* Unique Custom Icon (never used anywhere else)    */
/* "Knowledge Glyph" – represents layered knowledge */
/* ──────────────────────────────────────────────── */
function KnowledgeGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* outer diamond */}
      <path d="M18 2 L33 18 L18 34 L3 18 Z" />

      {/* inner rotated square */}
      <path d="M18 9 L27 18 L18 27 L9 18 Z" />

      {/* central spark */}
      <circle cx="18" cy="18" r="2" fill="currentColor" />
    </svg>
  );
}
/* ──────────────────────────────────────────────── */

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(20);

  const links = [
    { label: 'Explore', href: '/knowledge' },
    { label: 'Quizzes', href: '/quiz' },
    { label: 'Add Knowledge', href: '/new' },
    { label: 'My Knowledge', href: '/userall' },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-[60] w-full transition-all duration-500",
        "backdrop-blur-xl border-b border-white/10",
        "bg-linear-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70",
        "shadow-[0_0_20px_rgba(0,0,0,0.4)]",
        scrolled && "shadow-[0_0_40px_rgba(0,0,0,0.7)] border-white/20"
      )}
    >
      {/* neon top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-80" />

      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-4 py-3 transition-all",
          scrolled ? "py-2" : "py-3"
        )}
      >
        {/* LOGO */}
        <Link href="/" className="relative group flex items-center gap-3">
          <KnowledgeGlyph className="w-6 h-6 text-cyan-300 transition-all group-hover:text-pink-300 group-hover:scale-110" />

          <span className="text-lg font-extrabold tracking-wide text-white transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-cyan-300 group-hover:via-purple-300 group-hover:to-pink-300">
            Knowledge Vault
          </span>

          {/* glow orb */}
          <div className="absolute -right-4 top-1 h-4 w-4 rounded-full bg-cyan-400/40 blur-md opacity-0 group-hover:opacity-100 transition-all" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={cn(
                "px-4 py-2 rounded-xl text-white text-sm font-medium transition-all",
                "hover:bg-linear-to-r hover:from-cyan-400/10 hover:to-purple-500/10",
                "hover:border-white/20 hover:shadow-lg",
                "border border-transparent"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right (Auth + Menu Icon) */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <Link
              href="/signin"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                "border-white/20 bg-white/5 backdrop-blur-md text-white"
              )}
            >
              Sign In
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/signin" />
          </SignedIn>

          {/* Mobile menu toggle */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpen(!open)}
            className="md:hidden border border-white/20 bg-white/5 backdrop-blur-md"
          >
            <MenuToggleIcon open={open} className="size-6" duration={300} />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed left-0 right-0 top-14 backdrop-blur-xl border-t border-white/20",
          "bg-linear-to-b from-slate-900/90 to-slate-800/90 shadow-lg",
          open ? "h-[calc(100vh-3.5rem)] opacity-100" : "h-0 opacity-0 pointer-events-none",
          "transition-all duration-300 overflow-hidden"
        )}
      >
        <div className="flex flex-col justify-between h-full p-4">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="w-full px-4 py-3 rounded-xl border border-white/10 text-white text-base bg-white/5 backdrop-blur-md transition-all hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth buttons bottom */}
          <div className="flex flex-col gap-2">
            <SignedOut>
              <Link
                href="/signin"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  "w-full border-white/20 bg-white/5 backdrop-blur-md"
                )}
              >
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/signin" />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
