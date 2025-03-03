"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Dumbbell, 
  Home, 
  ListChecks, 
  LogOut, 
  Menu, 
  PlusCircle, 
  User 
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="mr-2 h-4 w-4" />,
      active: pathname === "/dashboard",
    },
    {
      href: "/workouts",
      label: "Treinos",
      icon: <ListChecks className="mr-2 h-4 w-4" />,
      active: pathname === "/workouts" || pathname.startsWith("/workouts/"),
    },
    {
      href: "/workouts/create",
      label: "Criar Treino",
      icon: <PlusCircle className="mr-2 h-4 w-4" />,
      active: pathname === "/workouts/create",
    },
    {
      href: "/session",
      label: "Registrar Treino",
      icon: <Dumbbell className="mr-2 h-4 w-4" />,
      active: pathname === "/session" || pathname.startsWith("/session/"),
    },
  ]

  return (
    <div className="flex items-center">
      <div className="flex lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[280px]">
            <div className="flex h-full flex-col justify-between py-4">
              <div className="px-2 py-2">
                <Link
                  href="/dashboard"
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
                        "flex items-center text-sm font-medium px-3 py-2 rounded-md",
                        route.active
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )}
                    >
                      {route.icon}
                      {route.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="px-4">
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <Link href="/dashboard" className="flex items-center">
        <Dumbbell className="h-6 w-6 mr-2 hidden md:block" />
        <span className="font-bold hidden md:block">FitTrack</span>
      </Link>
      <nav className="hidden lg:flex items-center space-x-4 ml-8">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-sm font-medium px-3 py-2 rounded-md",
              route.active
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            {route.icon}
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}