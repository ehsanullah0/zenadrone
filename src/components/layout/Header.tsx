"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";

const navLinks = [
  { name: "DRONES", href: "#drones", hasDropdown: true },
  { name: "FEATURES", href: "#features" },
  { name: "INDUSTRIES", href: "#industries", hasDropdown: true },
  { name: "BLOG", href: "#blog" },
  { name: "RESOURCES", href: "#resources", hasDropdown: true },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full z-50 bg-white shadow-xl relative text-gray-800">
      {/* Top Bar */}
      <div className="bg-[#1e609a] text-white text-sm py-2 px-6">
        <div className="container mx-auto flex justify-between items-center max-w-7xl">
          <div className="flex gap-2 items-center">
            {/* Social Icons matching image styling */}
            <Link href="#" className="w-6 h-6 bg-white text-[#1e609a] flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
              <span className="font-bold text-[12px] leading-none">f</span>
            </Link>
            <Link href="#" className="w-6 h-6 bg-white text-[#1e609a] flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
              <span className="font-bold text-[12px] leading-none">X</span>
            </Link>
            <Link href="#" className="w-6 h-6 bg-white text-[#1e609a] flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
              <span className="font-bold text-[12px] leading-none">in</span>
            </Link>
            <Link href="#" className="w-6 h-6 bg-white text-[#1e609a] flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
              <span className="font-bold text-[12px] leading-none text-center">yt</span>
            </Link>
            <Link href="#" className="w-6 h-6 bg-white text-[#1e609a] flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
              <span className="font-bold text-[12px] leading-none">ig</span>
            </Link>
          </div>
          
          <div className="flex gap-6 items-center font-medium">
            <Link href="#about" className="hover:text-gray-300 transition-colors">About Us</Link>
            <Link href="#contact" className="hover:text-gray-300 transition-colors">Contact Us</Link>
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-300 transition-colors">
               🇺🇸 English <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="py-4 px-6 border-b border-gray-100 bg-white">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/ZenaDrone-Logo-1.png" alt="ZenaDrone" className="h-14 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-gray-800 hover:text-[#cc2027] transition-colors flex items-center gap-1"
              >
                {link.name} {link.hasDropdown && <ChevronDown size={16} />}
              </Link>
            ))}
            
            <Button variant="red" className="px-6 py-2 h-auto text-sm font-bold tracking-wider rounded border border-[#b31c25]">
              BOOK A SERVICE
            </Button>
          </nav>

          {/* Mobile Nav Toggle */}
          <button
            className="lg:hidden text-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 p-6 flex flex-col gap-4 shadow-xl z-50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-semibold text-gray-800 flex justify-between items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name} {link.hasDropdown && <ChevronDown size={20} />}
            </Link>
          ))}
          <Button variant="red" className="mt-4 font-bold tracking-wider">
            BOOK A SERVICE
          </Button>
        </div>
      )}
    </header>
  );
}
