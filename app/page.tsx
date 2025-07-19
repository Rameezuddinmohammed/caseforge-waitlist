"use client"
import { useState } from "react"
import { InputForm } from "@/components/waitlist-form"
import { Questionnaire } from "@/components/questionnaire"
import { ShareModal } from "@/components/share-modal"
import { WaitlistWrapper } from "@/components/box"
import { ThemeSwitcher } from "@/components/switch-theme"
import Image from "next/image"

type FormState = "email" | "success" | "questionnaire" | "complete"

export default function Home() {
  const [formState, setFormState] = useState<FormState>("email")
  const [userEmail, setUserEmail] = useState("")
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const handleEmailSubmit = (data: FormData) => {
    return new Promise<{ success: true } | { success: false; error: string }>(async (resolve) => {
      try {
        const email = data.get("email") as string

        if (!email || !email.includes("@")) {
          resolve({
            success: false as const,
            error: "Please enter a valid email address",
          })
          return
        }

        // Submit email via API
        const response = await fetch('/api/submit-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })

        const result = await response.json()
        
        if (!result.success) {
          resolve({
            success: false as const,
            error: result.error || "There was an error while submitting the form",
          })
          return
        }

        setUserEmail(email)
        setFormState("success")
        resolve({ success: true as const })
      } catch (error) {
        console.error(error)
        resolve({
          success: false as const,
          error: "There was an error while submitting the form",
        })
      }
    })
  }

  const handleQuestionnaireComplete = async (answers: any) => {
    try {
      // Submit questionnaire data via API
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: userEmail,
          questionnaireData: answers 
        }),
      })

      const result = await response.json()
      
      if (!result.success) {
        console.error('Error saving questionnaire:', result.error)
      }
      
      setFormState("complete")
    } catch (error) {
      console.error('Error saving questionnaire:', error)
      setFormState("complete") // Still complete even if there's an error
    }
  }

  const handleSkipQuestionnaire = () => {
    setFormState("complete")
  }

  const handleStartQuestionnaire = () => {
    setFormState("questionnaire")
  }

  const handleReset = () => {
    setFormState("email")
    setUserEmail("")
  }

  const handleShare = () => {
    setIsShareModalOpen(true)
  }

  return (
    <>
      {formState === "questionnaire" ? (
        // Questionnaire without wrapper to avoid nested containers
        <div className="w-full mx-auto max-w-[500px] flex flex-col justify-center items-center bg-gray-1/85 pb-0 overflow-hidden rounded-2xl backdrop-blur-sm border border-white/10 shadow-[0px_170px_48px_0px_rgba(18,_18,_19,_0.00),_0px_109px_44px_0px_rgba(18,_18,_19,_0.01),_0px_61px_37px_0px_rgba(18,_18,_19,_0.05),_0px_27px_27px_0px_rgba(18,_18,_19,_0.09),_0px_7px_15px_0px_rgba(18,_18,_19,_0.10)]">
          <div className="flex flex-col items-center gap-4 flex-1 text-center w-full p-8 pb-4">
            <div>
              {/* Caseforge logo */}
              <div className="flex justify-center w-48 h-16 items-center mx-auto">
                <Image
                  src="/caseforge-logo-dark.png"
                  alt="Caseforge"
                  width={192}
                  height={64}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <Questionnaire
              email={userEmail}
              onComplete={handleQuestionnaireComplete}
              onSkip={handleSkipQuestionnaire}
            />
          </div>
          <footer className="flex justify-between items-center w-full self-stretch px-8 py-3 text-sm bg-gray-12/[.07] overflow-hidden backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs text-slate-10">
              <a 
                href="https://facebook.com/CaseforgeApp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-slate-12 transition-colors"
              >
                Facebook
              </a>
              <span className="text-slate-8">|</span>
              <a 
                href="https://linkedin.com/company/CaseforgeApp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-slate-12 transition-colors"
              >
                LinkedIn
              </a>
              <span className="text-slate-8">|</span>
              <a 
                href="https://instagram.com/CaseforgeApp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-slate-12 transition-colors"
              >
                Instagram
              </a>
            </div>
            <ThemeSwitcher />
          </footer>
        </div>
      ) : (
        <WaitlistWrapper>
          {formState === "email" && (
            <>
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
                  formAction={handleEmailSubmit}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
            </>
          )}

          {formState === "success" && (
            <div className="space-y-6 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-medium text-slate-12">
                  Welcome aboard! 🎉
                </h2>
                <p className="text-slate-10">
                  You're now on the waitlist. We'll notify you as soon as Caseforge launches.
                </p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={handleStartQuestionnaire}
                  className="px-6 py-3 bg-gray-12 text-gray-1 text-sm rounded-full font-medium hover:bg-gray-11 transition-all"
                >
                  Help us personalize your experience (optional)
                </button>
                
                <button
                  onClick={handleReset}
                  className="block text-sm text-slate-10 hover:text-slate-12 transition-colors"
                >
                  Submit another email
                </button>
              </div>
            </div>
          )}

          {formState === "complete" && (
            <div className="space-y-6 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-medium text-slate-12">
                  Thank you! 🙏
                </h2>
                <p className="text-slate-10">
                  Your responses will help us build Caseforge just for you. We'll be in touch soon!
                </p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={handleShare}
                  className="px-6 py-3 bg-gray-12 text-gray-1 text-sm rounded-full font-medium hover:bg-gray-11 transition-all"
                >
                  Share with friends! 🚀
                </button>
                
                <button
                  onClick={handleReset}
                  className="block text-sm text-slate-10 hover:text-slate-12 transition-colors"
                >
                  Submit another email
                </button>
              </div>
            </div>
          )}
        </WaitlistWrapper>
      )}

      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
      />
    </>
  )
}
