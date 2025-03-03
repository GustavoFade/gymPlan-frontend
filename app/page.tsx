import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dumbbell, BarChart3, Calendar } from "lucide-react";
import ImageSlider from "@/components/image-slider";
import { LandingPageNav } from "@/components/landing-page-nav";
import { PriceTables } from "@/components/pricing-tables";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingPageNav />
      <main className="flex-1 w-full">
        <section id="inside-fittrack" className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Acompanhe seu progresso na academia
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Registre seus treinos, acompanhe seu progresso e alcance seus objetivos com o FitTrack.
                </p>
              </div>

              <ImageSlider />

              <div className="space-x-4">
                <Link href="#plans">
                  <Button>Começar agora</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Dumbbell className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Registre seus treinos</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Crie e personalize seus treinos diários com facilidade.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Acompanhe seu progresso</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Visualize seu progresso através de gráficos e estatísticas.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Planeje sua rotina</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Organize seus treinos semanais e mantenha-se consistente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="plans" className="w-full flex items-center justify-center">
            <PriceTables />
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 FitTrack. Todos os direitos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Termos de Serviço
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacidade
          </Link>
        </nav>
      </footer>
    </div>
  );
}