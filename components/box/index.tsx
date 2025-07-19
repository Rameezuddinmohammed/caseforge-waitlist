import clsx from "clsx"
import type { PropsWithChildren } from "react"
import { ThemeSwitcher } from "../switch-theme"
import Image from "next/image"

export function WaitlistWrapper({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        "w-full mx-auto max-w-[500px] flex flex-col justify-center items-center bg-gray-1/85 pb-0 overflow-hidden rounded-2xl backdrop-blur-sm border border-white/10",
        "shadow-[0px_170px_48px_0px_rgba(18,_18,_19,_0.00),_0px_109px_44px_0px_rgba(18,_18,_19,_0.01),_0px_61px_37px_0px_rgba(18,_18,_19,_0.05),_0px_27px_27px_0px_rgba(18,_18,_19,_0.09),_0px_7px_15px_0px_rgba(18,_18,_19,_0.10)]",
      )}
    >
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
        <div className="flex flex-col gap-10">{children}</div>
      </div>
      <footer className="flex justify-between items-center w-full self-stretch px-8 py-3 text-sm bg-gray-12/[.07] overflow-hidden backdrop-blur-sm">
        <div className="flex items-center gap-2 text-xs text-slate-10">
          <a 
            href="https://facebook.com/caseforge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-slate-12 transition-colors"
          >
            Facebook
          </a>
          <span className="text-slate-8">|</span>
          <a 
            href="https://linkedin.com/company/caseforge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-slate-12 transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-slate-8">|</span>
          <a 
            href="https://instagram.com/caseforge" 
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
  )
}
