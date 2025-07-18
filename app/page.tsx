import { supabaseAdmin } from "@/lib/supabase/server"
import { InputForm } from "@/components/waitlist-form"
import { WaitlistWrapper } from "@/components/box"
import type { Metadata } from "next"

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

export default async function Home() {
  const { data: waitlist } = await supabaseAdmin.from("waitlist").select("*").single()

  return (
    <WaitlistWrapper>
      {/* Heading */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-medium text-slate-12 whitespace-pre-wrap text-pretty">
          {waitlist?.title || "Join the Waitlist"}
        </h1>
        {waitlist?.subtitle && (
          <div className="text-slate-10 [&>p]:tracking-tight text-pretty">
            <p>{waitlist.subtitle}</p>
          </div>
        )}
      </div>
      {/* Form */}
      <div className="px-1 flex flex-col w-full self-stretch">
        <InputForm
          buttonCopy={{
            idle: "Sign-up for Early Access", // Changed from "Join Waitlist"
            success: "Welcome aboard!",
            loading: "Joining...",
          }}
          formAction={async (data) => {
            "use server"
            try {
              const email = data.get("email") as string

              if (!email || !email.includes("@")) {
                return {
                  success: false,
                  error: "Please enter a valid email address",
                }
              }

              const { error } = await supabaseAdmin.from("waitlist_entries").insert([{ email }])

              if (error) {
                if (error.code === "23505") {
                  // Unique constraint violation
                  return {
                    success: false,
                    error: "This email is already on the waitlist",
                  }
                }
                throw error
              }

              return { success: true }
            } catch (error) {
              console.error(error)
              return {
                success: false,
                error: "There was an error while submitting the form",
              }
            }
          }}
          type="email"
          name="email"
          placeholder="Enter your email"
          required
        />
      </div>
    </WaitlistWrapper>
  )
}
