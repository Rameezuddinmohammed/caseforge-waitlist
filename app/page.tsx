import { InputForm } from "@/components/waitlist-form"
import { WaitlistWrapper } from "@/components/box"
import { addEmailToSheet, checkEmailExists } from "@/lib/google-sheets"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Caseforge - Join the Waitlist",
  description: "Join the waitlist and unlock exclusive access to premium case-solving tools, simulations, and rewards before anyone else.",
}

export default async function Home() {
  return (
    <WaitlistWrapper>
      {/* Heading */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-medium text-slate-12 whitespace-pre-wrap text-pretty">
          Join the Waitlist
        </h1>
        <div className="text-slate-10 [&>p]:tracking-tight text-pretty">
          <p>Join the waitlist and unlock exclusive access to premium case-solving tools, simulations, and rewards before anyone else.</p>
        </div>
      </div>
      {/* Form */}
      <div className="px-1 flex flex-col w-full self-stretch">
        <InputForm
          buttonCopy={{
            idle: "Sign-up for Early Access",
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

              // Check if email already exists
              const emailExists = await checkEmailExists(email)
              if (emailExists) {
                return {
                  success: false,
                  error: "This email is already on the waitlist",
                }
              }

              // Add email to Google Sheet
              const result = await addEmailToSheet(email)
              
              if (!result.success) {
                return {
                  success: false,
                  error: "There was an error while submitting the form",
                }
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
