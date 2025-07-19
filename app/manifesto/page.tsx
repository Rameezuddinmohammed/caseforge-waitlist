import { WaitlistWrapper } from "@/components/box"
import { Alex_Brush } from "next/font/google"
import type { Metadata } from "next"

const font = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
})

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Manifesto - Caseforge",
  description: "Our manifesto and vision for the future of learning.",
}

export default async function Manifesto() {
  return (
    <WaitlistWrapper>
      <div className="flex flex-col gap-10">
        <div className="text-slate-11 [&>p]:tracking-tight [&>p]:leading-[1.6] [&>p:not(:last-child)]:mb-3 text-pretty text-start">
          <p>We believe learning should feel like solving real-world problems, not memorizing textbook jargon. We're building a platform where ambition meets action — where every case sharpens your thinking, tests your instincts, and prepares you for the challenges of the business world. This is our manifesto: to break the mold of passive learning, to forge future leaders through simulation, and to design every experience with purpose, integrity, and the learner at heart.</p>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-0.5 items-start">
            <p className="text-slate-11 text-sm font-medium">
              Rameez Mohd <span className="text-slate-10 text-xs">Founder & CEO</span>
            </p>
          </div>
        </div>
      </div>
    </WaitlistWrapper>
  )
}
