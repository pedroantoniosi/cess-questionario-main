"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Container from "./Container";
import Logo from "./Logo";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Projetos", href: "/projetos" },
  { label: "Pesquisas", href: "/pesquisas" },
  { label: "Equipe", href: "/time" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 z-40 w-full bg-navbar shadow-lg">
      <Container className="flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <Logo className="w-10 text-white" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-all duration-200 hover:scale-105 text-white hover:text-zinc-500"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center justify-center rounded-lg p-2 text-white transition-colors md:hidden"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </Container>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={`grid overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="flex flex-col gap-1 border-t border-gray-100 bg-white px-6 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-4 py-3 text-whitetransition-colors duration-200  hover:text-zinc-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
