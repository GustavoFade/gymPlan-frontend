"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getWorkoutPlanById, getExerciseById } from "@/lib/data"
import { ArrowLeft, Check, ChevronDown, ChevronUp, Clock, Dumbbell } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

type ExerciseSet = {
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
}

type SessionExercise = {
  id: string;
  exerciseId: string;
  name: string;
  sets: ExerciseSet[];
  expanded: boolean;
}

export default function WorkoutSessionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams();
  const id : string | null = searchParams.get("id");
  const [exercises, setExercises] = useState<SessionExercise[]>([])
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  
  useEffect(() => {
    if (!id) {
      return;
    }
    // Find the workout plan by ID
    const plan = getWorkoutPlanById(id)
    
    if (plan) {
      // Transform workout plan exercises to session exercises
      const sessionExercises = plan.exercises.map((exercise) => {
        const exerciseDetails = getExerciseById(exercise.exerciseId)
        
        return {
          id: exercise.id,
          exerciseId: exercise.exerciseId,
          name: exerciseDetails?.name || "Exercício desconhecido",
          sets: Array.from({ length: exercise.sets }, (_, i) => ({
            setNumber: i + 1,
            reps: exercise.repsPerSet,
            weight: exercise.weight || 0,
            completed: false,
          })),
          expanded: false,
        }
      })
      
      // Set the first exercise as expanded
      if (sessionExercises.length > 0) {
        sessionExercises[0].expanded = true
      }
      
      setExercises(sessionExercises)
      setStartTime(new Date())
    } else {
      toast({
        title: "Erro",
        description: "Treino não encontrado",
        variant: "destructive"
      })
      router.push("/session")
    }
  }, [id, router, toast])
  
  // Update elapsed time
  useEffect(() => {
    if (!startTime || isFinished) return
    
    const interval = setInterval(() => {
      const now = new Date()
      const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000)
      setElapsedTime(elapsed)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [startTime, isFinished])
  
  // Update progress
  useEffect(() => {
    if (exercises.length === 0) return
    
    const totalSets = exercises.reduce((total, exercise) => total + exercise.sets.length, 0)
    const completedSets = exercises.reduce((total, exercise) => {
      return total + exercise.sets.filter(set => set.completed).length
    }, 0)
    
    const newProgress = Math.round((completedSets / totalSets) * 100)
    setProgress(newProgress)
    
    // Check if workout is finished
    if (newProgress === 100 && !isFinished) {
      setIsFinished(true)
      toast({
        title: "Treino concluído!",
        description: "Parabéns! Você completou todos os exercícios.",
      })
    }
  }, [exercises, isFinished, toast])
  
  const toggleExerciseExpanded = (index: number) => {
    
    setExercises(prev => {
      const updated = [...prev]
      updated[index].expanded = !updated[index].expanded
            

      return updated
    })
  }
  
  const handleSetCompleted = (exerciseIndex: number, setIndex: number, completed: boolean) => {
    setExercises(prev => {
      const updated = [...prev]
      updated[exerciseIndex].sets[setIndex].completed = completed

      return updated
    })
  }
  
  const handleUpdateReps = (exerciseIndex: number, setIndex: number, reps: number) => {
    setExercises(prev => {
      const updated = [...prev]
      updated[exerciseIndex].sets[setIndex].reps = reps
      return updated
    })
  }
  
  const handleUpdateWeight = (exerciseIndex: number, setIndex: number, weight: number) => {
    setExercises(prev => {
      const updated = [...prev]
      updated[exerciseIndex].sets[setIndex].weight = weight
      return updated
    })
  }
  
  const handleFinishWorkout = () => {
    // In a real app, you would save the workout session to your backend
    toast({
      title: "Treino salvo",
      description: "Seu treino foi registrado com sucesso"
    })
    
    router.push("/dashboard")
  }
  
  // Format elapsed time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center mb-6">
          <Link href="/session">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Registrar Treino</h1>
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Progresso</CardTitle>
                  <CardDescription>
                    {progress}% concluído
                  </CardDescription>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatTime(elapsedTime)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>
          
          {exercises.map((exercise, exerciseIndex) => (
            <Card key={exercise.id}>
              <CardHeader className="pb-3">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleExerciseExpanded(exerciseIndex)}
                >
                  <div className="flex items-center">
                    <Dumbbell className="h-5 w-5 mr-2 text-muted-foreground" />
                    <CardTitle>{exercise.name}</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm">
                    {exercise.expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
                <CardDescription>
                  {exercise.sets.filter(set => set.completed).length} de {exercise.sets.length} séries concluídas
                </CardDescription>
              </CardHeader>
              
              {exercise.expanded && (
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground">
                      <div className="col-span-1">Série</div>
                      <div className="col-span-4">Repetições</div>
                      <div className="col-span-4">Peso (kg)</div>
                      <div className="col-span-3 text-right">Concluído</div>
                    </div>
                    
                    <Separator />
                    
                    {exercise.sets.map((set, setIndex) => (
                      <div key={setIndex} className="grid grid-cols-12 items-center">
                        <div className="col-span-1 font-medium">{set.setNumber}</div>
                        <div className="col-span-4">
                          <Input 
                            type="number" 
                            min={0}
                            value={set.reps} 
                            onChange={(e) => handleUpdateReps(exerciseIndex, setIndex, parseInt(e.target.value) || 0)}
                            className="h-8"
                          />
                        </div>
                        <div className="col-span-4">
                          <Input 
                            type="number" 
                            min={0}
                            step={0.5}
                            value={set.weight} 
                            onChange={(e) => handleUpdateWeight(exerciseIndex, setIndex, parseFloat(e.target.value) || 0)}
                            className="h-8"
                          />
                        </div>
                        <div className="col-span-3 flex justify-end">
                          <Checkbox 
                            checked={set.completed}
                            onCheckedChange={(checked) => handleSetCompleted(exerciseIndex, setIndex, checked === true)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
          
          <Button onClick={handleFinishWorkout} size="lg" className="mt-4">
            <Check className="mr-2 h-5 w-5" />
            Finalizar Treino
          </Button>
        </div>
      </main>
    </div>
  )
}