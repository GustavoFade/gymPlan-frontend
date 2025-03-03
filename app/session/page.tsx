"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { workoutPlans, getExerciseById } from "@/lib/data"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SessionPage() {
  const router = useRouter()
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null)
  
  const handleSelectWorkout = (id: string) => {
    setSelectedWorkout(id === selectedWorkout ? null : id)
  }
  
  const handleStartSession = () => {
    if (selectedWorkout) {
      router.push(`/session/register?id=${selectedWorkout}`)
    }
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Registrar Treino</h1>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Selecione um Treino</CardTitle>
              <CardDescription>
                Escolha o treino que você deseja registrar hoje
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {workoutPlans.map((plan) => (
                  <div 
                    key={plan.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedWorkout === plan.id 
                        ? "border-primary bg-primary/5" 
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleSelectWorkout(plan.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border ${
                        selectedWorkout === plan.id 
                          ? "bg-primary border-primary" 
                          : "border-muted-foreground"
                      }`}>
                        {selectedWorkout === plan.id && (
                          <div className="w-full h-full flex items-center justify-center text-primary-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-sm font-medium">Exercícios:</p>
                      <ul className="text-sm text-muted-foreground">
                        {plan.exercises.map((exercise) => {
                          const exerciseDetails = getExerciseById(exercise.exerciseId)
                          return (
                            <li key={exercise.id}>
                              {exerciseDetails?.name} - {exercise.sets} × {exercise.repsPerSet}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={handleStartSession} 
                disabled={!selectedWorkout}
                className="w-full"
              >
                Iniciar Treino
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}