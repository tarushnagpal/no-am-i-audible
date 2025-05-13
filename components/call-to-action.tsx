"use client"

import { useState } from "react"
import { Copy, Check, Share2, Twitter, Facebook, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function CallToAction() {
  const [copied, setCopied] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)

  const siteUrl = "https://noamiaudible.com"
  const shareText =
    "Stop asking 'Am I audible?' in video calls! If you see the audio visualizer moving, we can hear you! Check out:"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(siteUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`,
      "_blank",
    )
  }

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`, "_blank")
  }

  return (
    <section id="share" className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Spread the Word!</h2>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              Help make virtual meetings more efficient by sharing this site with your colleagues and friends.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div className="relative flex-1 max-w-md mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg flex items-center p-2 shadow-inner">
                <input
                  type="text"
                  value={siteUrl}
                  readOnly
                  className="flex-1 bg-transparent border-none focus:outline-none px-2 py-1 text-gray-700 dark:text-gray-200"
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={copyToClipboard}
                        className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                      >
                        {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                        <span className="sr-only">Copy URL</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{copied ? "Copied!" : "Copy URL"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="relative">
              <Button
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="bg-white text-purple-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-purple-400 dark:hover:bg-gray-700"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>

              {showShareOptions && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-10 flex flex-col gap-1 min-w-[150px]">
                  <Button
                    variant="ghost"
                    onClick={shareOnTwitter}
                    className="justify-start text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    <Twitter className="h-5 w-5 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={shareOnFacebook}
                    className="justify-start text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    <Facebook className="h-5 w-5 mr-2" />
                    Facebook
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={shareOnLinkedIn}
                    className="justify-start text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-purple-700 dark:bg-purple-900 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Want to learn more?</h3>
              <p className="text-purple-200">Check out our tips for better virtual meeting etiquette.</p>
            </div>
            <Button className="bg-white text-purple-600 hover:bg-gray-100">Meeting Tips</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
