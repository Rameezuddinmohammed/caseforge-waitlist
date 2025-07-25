import { NavbarLink, NavbarLinkBackground } from "./link"
import clsx from "clsx"

export const Header = async () => {
  const navbarItems = [
    { title: "Waitlist", href: "/" },
    { title: "Manifesto", href: "/manifesto" }
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      <nav className="bg-slate-1 rounded-full">
        <div
          className={clsx(
            "bg-slate-1 rounded-full p-1 flex relative items-center",
            "shadow-[0px_-1px_3px_0px_rgba(0,_0,_0,_0.05),_0px_7px_2px_0px_rgba(0,_0,_0,_0.02),_0px_4px_2px_0px_rgba(0,_0,_0,_0.05),_0px_2px_1px_0px_rgba(0,_0,_0,_0.05),_0px_1px_1px_0px_rgba(0,_0,_0,_0.03),_0px_0px_1px_0px_rgba(0,_0,_0,_0.04)]",
            "dark:shadow-[0px_-1px_3px_0px_rgba(0,_0,_0,_0.03),_0px_7px_2px_0px_rgba(0,_0,_0,_0.03),_0px_4px_2px_0px_rgba(0,_0,_0,_0.05),_0px_2px_1px_0px_rgba(0,_0,_0,_0.1),_0px_1px_1px_0px_rgba(0,_0,_0,_0.1),_0px_0px_1px_0px_rgba(0,_0,_0,_0.1)]",
          )}
        >
          {/* Animated background */}
          <NavbarLinkBackground links={navbarItems.map((item) => item.href)} />

          {/* Navigation items */}
          {navbarItems.map((item) => (
            <NavbarLink key={item.href} href={item.href}>
              {item.title}
            </NavbarLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
