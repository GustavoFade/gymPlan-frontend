"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { 
  Building2, 
  Dumbbell, 
  LogIn, 
  Tag, 
} from "lucide-react"

export function LandingPageNav() {
  const routes = [
    {
      href: "#inside-fittrack",
      label: "Por dentro da FitTrack",
      icon: <Building2 className="mr-2 h-4 w-4" />
    },
    {
      href: "#plans",
      label: "Planos",
      icon: <Tag className="mr-2 h-4 w-4" />,
    },
    {
      href: "/login",
      label: "Login",
      icon: <LogIn className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <div className="flex items-center bg-primary" style={{padding: "15px", position: "fixed", top: "0", right: "0", left: "0", zIndex: "9999"}}>
      <Link href="/" className="flex items-center rounded-md text-secondary">
        <Dumbbell className="h-6 w-6 mr-2 hidden md:block" />
        <span className="font-bold hidden md:block">FitTrack</span>
      </Link>
      <nav className="hidden lg:flex items-center space-x-4 ml-8 w-full">
        {routes.map((route) => 
          {
            if (route.href === "/login") {
              return (
                <Link
                key={route.href}
                href={route.href}
                style={{position: "absolute", right: "0"}}
                className={cn(
                  "flex items-end text-sm font-medium px-3 py-2 rounded-md text-secondary",
                    "hover:bg-gray-500"
                )}
              >
                {route.icon}
                {route.label}
              </Link>
              )
            }
            return(
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center text-sm font-medium px-3 py-2 rounded-md text-secondary",
                    "hover:bg-gray-500"
                )}
              >
                {route.icon}
                {route.label}
              </Link>
            )
          }
        )}
      </nav>
    </div>
  )
}