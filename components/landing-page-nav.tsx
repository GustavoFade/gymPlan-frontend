"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { 
  Building2, 
  Dumbbell, 
  LogIn, 
  Tag, 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Menu 
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function LandingPageNav() {
    const [open, setOpen] = useState(false)
  
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
    <>
      <div className="flex items-center bg-primary" style={{ padding: "15px", position: "sticky", top: "0", right: "0", left: "0", zIndex: "9999" }}>
        <div className="flex lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[280px]" style={{zIndex: "99999"}}>
              <div className="flex h-full flex-col justify-between py-4">
                <div className="px-2 py-2">
                  <Link
                    href="/"
                    className="flex items-center mb-8"
                    onClick={() => setOpen(false)}
                  >
                    <Dumbbell className="h-6 w-6 mr-2" />
                    <span className="font-bold">FitTrack</span>
                  </Link>
                  <div className="space-y-1">
                    {routes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center text-sm font-medium px-3 py-2 rounded-md text-primary",
                          "hover:bg-gray-500"
                        )}
                      >
                        {route.icon}
                        {route.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Link href="/" className="flex items-center rounded-md text-secondary">
          <Dumbbell className="h-6 w-6 mr-2 hidden md:block" />
          <span className="font-bold hidden md:block">FitTrack</span>
        </Link>
        <nav className="hidden lg:flex items-center space-x-4 ml-8 w-full">
          {routes.map((route) => {
            if (route.href === "/login") {
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  style={{ position: "absolute", right: "0" }}
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
            return (
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
    </>
  )
}