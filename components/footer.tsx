import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-purple-200/20 bg-white/70 dark:bg-gray-950/70 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <Link
              href="/"
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
            >
              NoAmIAudible
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Making virtual meetings more efficient, one call at a time.
            </p>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
            <a className="underline" href="https://x.com/tarushnagpal">by people who are tired of hearing "Am I audible?"</a>
          </div>

        </div>
      </div>
    </footer>
  )
}
