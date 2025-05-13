"use client"

import { useState } from "react"
import { Clock, Lightbulb, Frown, ThumbsUp } from "lucide-react"
import { motion } from "framer-motion"

export function FunFacts() {
  const [activeTab, setActiveTab] = useState(0)

  const facts = [
    {
      icon: <Frown className="h-6 w-6" />,
      title: "Meeting Disruption",
      content:
        "Asking 'Am I audible?' interrupts the flow of conversation and forces everyone to shift focus away from the meeting's purpose.",
    },
    {
      icon: <ThumbsUp className="h-6 w-6" />,
      title: "Professional Impression",
      content:
        "Starting with substance instead of audio checks makes you appear more confident and prepared in virtual meetings.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time Waster",
      content:
        "The average meeting wastes 2-3 minutes with 'Am I audible?' questions that could be avoided by simply checking the audio visualizer.",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Better Alternatives",
      content:
        "Instead of asking if you're audible, try sharing something valuable right away. If people can hear you, they'll respond to what you said!",
    },
  ]

  return (
    <section id="why" className="py-12 md:py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why This Matters</h2>
        <p className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
          The "Am I audible?" question is more than just a minor annoyance
        </p>
      </div>

      <div className="md:max-w-4xl mx-auto">
        <div className="flex overflow-x-auto pb-2 mb-6 gap-2 items-center md:justify-center">
          {facts.map((fact, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeTab === index
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                {fact.icon}
                <span>{fact.title}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-[250px]">
            {facts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: activeTab === index ? 1 : 0,
                  x: activeTab === index ? 0 : 20,
                  zIndex: activeTab === index ? 10 : 0,
                }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 p-6 md:p-8 ${activeTab === index ? "block" : "hidden"}`}
              >
                <div className="flex flex-col h-full justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-600 dark:text-purple-300">
                      {fact.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{fact.title}</h3>
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-200">{fact.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
