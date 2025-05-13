"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-200/20 backdrop-blur-lg bg-white/70 dark:bg-gray-950/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            NoAmIAudible
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#alternatives"
            className="text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
          >
            What To Do Instead
          </Link>
          <Link
            href="#why"
            className="text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
          >
            Why It Matters
          </Link>
          <Link
            href="#share"
            className="text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
          >
            Share This
          </Link>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-purple-700" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
        </nav>

        <div className="flex md:hidden items-center gap-4">
          {mounted && (
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-purple-700" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-950 border-b border-purple-200/20 py-4 px-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#why"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Why It Matters
              </Link>
              <Link
                href="#alternatives"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                What To Do Instead
              </Link>
              <Link
                href="#share"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Share This
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
