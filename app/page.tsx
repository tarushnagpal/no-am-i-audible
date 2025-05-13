import { AudioVisualizer } from "@/components/audio-visualizer"
import { MicrophoneAnimation } from "@/components/microphone-animation"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { FunFacts } from "@/components/fun-facts"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-violet-50 to-purple-100 dark:from-violet-950 dark:to-purple-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="py-12 md:py-24 lg:py-32 flex flex-col items-center text-center">
          <div className="relative mb-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 animate-gradient">
              No "Am I Audible?"
            </h1>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse"></div>
          </div>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto mt-8 text-gray-700 dark:text-gray-200">
            If you see the audio visualizer moving,{" "}
            <span className="font-bold text-purple-600 dark:text-purple-400">WE CAN HEAR YOU!</span>
          </p>
        </section>

        <section className="py-12 md:py-16 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                We can see when you're speaking
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">
                Modern video conferencing tools show audio visualizers that move when you speak. If those bars are
                dancing, everyone can hear you!
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-200">
                Asking "Am I audible?" when your audio is clearly working wastes everyone's time and interrupts the flow
                of the meeting.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <MicrophoneAnimation />
            </div>
          </div>
        </section>
        <div className="mt-12 w-full max-w-2xl mx-auto">
            <AudioVisualizer />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
              (This visualizer reacts to your microphone - try speaking!)
            </p>
          </div>
        <FunFacts />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
