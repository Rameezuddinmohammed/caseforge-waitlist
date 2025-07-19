"use client"
import { useState } from "react"
import clsx from "clsx"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
}

const shareOptions = [
  {
    name: "Twitter/X",
    icon: "𝕏",
    color: "hover:bg-black hover:text-white",
    url: "https://twitter.com/intent/tweet",
    params: {
      text: "Just joined the waitlist for Caseforge - the ultimate business case solving platform! 🚀 Join me and get early access to premium learning tools:",
      url: "https://caseforge-waitlist.vercel.app"
    }
  },
  {
    name: "LinkedIn",
    icon: "💼",
    color: "hover:bg-blue-600 hover:text-white",
    url: "https://www.linkedin.com/sharing/share-offsite/",
    params: {
      url: "https://caseforge-waitlist.vercel.app"
    }
  },
  {
    name: "WhatsApp",
    icon: "💬",
    color: "hover:bg-green-500 hover:text-white",
    url: "https://wa.me/",
    params: {
      text: "Just joined the waitlist for Caseforge - the ultimate business case solving platform! 🚀 Join me and get early access to premium learning tools: https://caseforge-waitlist.vercel.app"
    }
  },
  {
    name: "Email",
    icon: "📧",
    color: "hover:bg-gray-600 hover:text-white",
    url: "mailto:",
    params: {
      subject: "Join me on Caseforge - Business Case Solving Platform",
      body: "Hey! I just joined the waitlist for Caseforge - the ultimate business case solving platform! 🚀\n\nJoin me and get early access to premium learning tools, simulations, and rewards before anyone else.\n\nCheck it out here: https://caseforge-waitlist.vercel.app"
    }
  }
]

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  const shareData = {
    title: "Join Caseforge Waitlist",
    text: "Just joined the waitlist for Caseforge - the ultimate business case solving platform! 🚀 Join me and get early access to premium learning tools.",
    url: "https://caseforge-waitlist.vercel.app"
  }

  const handleNativeShare = async () => {
    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        onClose()
      } else {
        // Fallback to custom share options
        setShowFallback(true)
      }
    } catch (error) {
      console.error('Error sharing:', error)
      // Fallback to custom share options
      setShowFallback(true)
    }
  }

  const handleShare = (option: typeof shareOptions[0]) => {
    const url = new URL(option.url)
    
    // Add parameters to URL
    Object.entries(option.params).forEach(([key, value]) => {
      if (key === 'url') {
        url.searchParams.set(key, value)
      } else {
        url.searchParams.set(key, value)
      }
    })

    // Open in new window
    window.open(url.toString(), '_blank', 'width=600,height=400')
  }

  const handleCopyLink = async () => {
    const url = "https://caseforge-waitlist.vercel.app"
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleClose = () => {
    setShowFallback(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[500px] flex flex-col justify-center items-center bg-gray-1/85 pb-0 overflow-hidden rounded-2xl backdrop-blur-sm border border-white/10 shadow-[0px_170px_48px_0px_rgba(18,_18,_19,_0.00),_0px_109px_44px_0px_rgba(18,_18,_19,_0.01),_0px_61px_37px_0px_rgba(18,_18,_19,_0.05),_0px_27px_27px_0px_rgba(18,_18,_19,_0.09),_0px_7px_15px_0px_rgba(18,_18,_19,_0.10)]">
        <div className="flex flex-col items-center gap-6 flex-1 text-center w-full p-8 pb-4">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-2xl font-medium text-slate-12">
              Share the Story! 🚀
            </h2>
            <p className="text-slate-10 text-sm">
              Help your friends join the waitlist and get early access to Caseforge
            </p>
          </div>

          {!showFallback ? (
            /* Native Share Button */
            <div className="w-full space-y-2">
              <button
                onClick={handleNativeShare}
                className="px-8 py-3 bg-gray-12 text-gray-1 text-base rounded-full font-medium hover:bg-gray-11 transition-all flex items-center justify-center gap-2 mx-auto"
              >
                Share
              </button>
              
              <button
                onClick={() => setShowFallback(true)}
                className="text-xs text-slate-10 hover:text-slate-12 transition-colors underline"
              >
                More sharing options
              </button>
            </div>
          ) : (
            /* Fallback Share Options */
            <>
              {/* Share Options */}
              <div className="grid grid-cols-2 gap-3 w-full">
                {shareOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => handleShare(option)}
                    className={clsx(
                      "flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-11/10 transition-all duration-200",
                      "bg-gray-11/5 text-gray-12",
                      option.color
                    )}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="text-sm font-medium">{option.name}</span>
                  </button>
                ))}
              </div>

              {/* Copy Link */}
              <div className="w-full space-y-3">
                <div className="flex items-center gap-2 p-3 bg-gray-11/5 rounded-lg border border-gray-11/10">
                  <input
                    type="text"
                    value="https://caseforge-waitlist.vercel.app"
                    readOnly
                    className="flex-1 bg-transparent text-sm text-gray-12 outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={clsx(
                      "px-3 py-1 text-xs rounded-full font-medium transition-all",
                      copied
                        ? "bg-green-500 text-white"
                        : "bg-gray-12 text-gray-1 hover:bg-gray-11"
                    )}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="px-6 py-2 text-sm text-slate-10 hover:text-slate-12 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
} 