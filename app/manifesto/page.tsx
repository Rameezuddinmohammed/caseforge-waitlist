import { supabaseAdmin } from "@/lib/supabase/server"
import { WaitlistWrapper } from "@/components/box"
import { Alex_Brush } from "next/font/google"
import type { Metadata } from "next"

const font = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
})

export const dynamic = "force_dynamic"

export const generateMetadata = async (): Promise<Metadata> => {
  const { data: metadata } = await supabaseAdmin.from("metadata").select("*").single()

  return {
    title: {
      template: metadata?.title_template || "%s | Waitlist",
      default: metadata?.default_title || "Waitlist",
    },
    description: metadata?.default_description || "Join our waitlist",
  }
}

export default async function Manifesto() {
  const { data: manifesto } = await supabaseAdmin.from("manifesto").select("*").single()

  return (
    <WaitlistWrapper>
      <div className="flex flex-col gap-10">
        <div className="text-slate-11 [&>p]:tracking-tight [&>p]:leading-[1.6] [&>p:not(:last-child)]:mb-3 text-pretty text-start">
          <p>{manifesto?.body || "Our manifesto will be available soon."}</p>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-0.5 items-start">
            <p className="text-slate-11 text-sm font-medium">
              {manifesto?.author_name || "Author"}{" "}
              <span className="text-slate-10 text-xs">{manifesto?.author_role || "Role"}</span>
            </p>
          </div>
        </div>
      </div>
    </WaitlistWrapper>
  )
}
