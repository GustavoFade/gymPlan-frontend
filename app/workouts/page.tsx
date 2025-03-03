"use client"

import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { workoutPlans, getExerciseById } from "@/lib/data"
import { Edit, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

export default function WorkoutsPage() {
  const [plans, setPlans] = useState(workoutPlans)
  const { toast } = useToast()

  const handleDelete = (id: string) => {
    setPlans(plans.filter(plan => plan.id !== id))
    toast({
      title: "Treino excluído",
      description: "O treino foi excluído com sucesso",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Treinos</h1>
          <Link href="/workouts/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Criar Treino
            </Button>
          </Link>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="font-medium">Exercícios:</h3>
                  <ul className="space-y-1">
                    {plan.exercises.map((exercise) => {
                      const exerciseDetails = getExerciseById(exercise.exerciseId)
                      return (
                        <li key={exercise.id} className="text-sm">
                          {exerciseDetails?.name} - {exercise.sets} × {exercise.repsPerSet} 
                          {exercise.weight ? ` @ ${exercise.weight}kg` : ''}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/workouts/edit?id=${plan.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente o treino.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(plan.id)}>
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}