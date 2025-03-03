"use client"

import { useState, useEffect, Suspense } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { exercises, workoutPlans, MuscleGroup, getMuscleGroupName, getExerciseById } from "@/lib/data"
import { Plus, Trash2, ArrowLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Loading from "@/components/ui/loader"

type ExerciseFormData = {
  id: string;
  exerciseId: string;
  sets: number;
  repsPerSet: number;
  weight?: number;
  restTime?: number;
  notes?: string;
}

function EditWorkout() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const id : string | null = searchParams.get("id");
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [workoutExercises, setWorkoutExercises] = useState<ExerciseFormData[]>([])
  const [currentExercise, setCurrentExercise] = useState<ExerciseFormData>({
    id: "",
    exerciseId: "",
    sets: 3,
    repsPerSet: 10,
    weight: undefined,
    restTime: 60,
    notes: ""
  })
  
  
  useEffect(() => {

    if (!id) {
      toast({
        title: "Erro",
        description: "Treino não encontrado",
        variant: "destructive"
      })
      router.push("/workouts")
    }
    const plan = workoutPlans.find(p => p.id === id)
    
    if (plan) {
      setName(plan.name)
      setDescription(plan.description || "")
      setWorkoutExercises(plan.exercises)
    } else {
      toast({
        title: "Erro",
        description: "Treino não encontrado",
        variant: "destructive"
      })
      router.push("/workouts")
    }
  }, [id, router, toast])
  
  const handleAddExercise = () => {
    if (!currentExercise.exerciseId) {
      toast({
        title: "Erro",
        description: "Selecione um exercício",
        variant: "destructive"
      })
      return
    }
    
    setWorkoutExercises([...workoutExercises, { ...currentExercise, id: Date.now().toString() }])
    setCurrentExercise({
      id: "",
      exerciseId: "",
      sets: 3,
      repsPerSet: 10,
      weight: undefined,
      restTime: 60,
      notes: ""
    })
  }
  
  const handleRemoveExercise = (index: number) => {
    const newExercises = [...workoutExercises]
    newExercises.splice(index, 1)
    setWorkoutExercises(newExercises)
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name) {
      toast({
        title: "Erro",
        description: "O nome do treino é obrigatório",
        variant: "destructive"
      })
      return
    }
    
    if (workoutExercises.length === 0) {
      toast({
        title: "Erro",
        description: "Adicione pelo menos um exercício ao treino",
        variant: "destructive"
      })
      return
    }
    
    // In a real app, you would save this to your backend
    toast({
      title: "Treino atualizado",
      description: "O treino foi atualizado com sucesso"
    })
    
    router.push("/workouts")
  }
  
  // Group exercises by muscle group
  const exercisesByMuscleGroup: Record<MuscleGroup, typeof exercises> = exercises.reduce((acc, exercise) => {
    if (!acc[exercise.muscleGroup]) {
      acc[exercise.muscleGroup] = []
    }
    acc[exercise.muscleGroup].push(exercise)
    return acc
  }, {} as Record<MuscleGroup, typeof exercises>)
  
  const muscleGroups = Object.keys(exercisesByMuscleGroup) as MuscleGroup[]
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center mb-6">
          <Link href="/workouts">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Editar Treino</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Treino</CardTitle>
                <CardDescription>
                  Atualize o nome e a descrição do treino
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Treino</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Ex: Treino A - Peito e Tríceps"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição (opcional)</Label>
                  <Textarea 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Descreva o objetivo deste treino"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Exercícios</CardTitle>
                <CardDescription>
                  Atualize os exercícios que compõem este treino
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="exercise">Exercício</Label>
                      <Select
                        value={currentExercise.exerciseId}
                        onValueChange={(value) => setCurrentExercise({...currentExercise, exerciseId: value})}
                      >
                        <SelectTrigger id="exercise">
                          <SelectValue placeholder="Selecione um exercício" />
                        </SelectTrigger>
                        <SelectContent>
                          {muscleGroups.map((group) => (
                            <div key={group}>
                              <div className="px-2 py-1.5 text-sm font-semibold">{getMuscleGroupName(group)}</div>
                              {exercisesByMuscleGroup[group].map((exercise) => (
                                <SelectItem key={exercise.id} value={exercise.id}>
                                  {exercise.name}
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sets">Séries</Label>
                        <Input 
                          id="sets" 
                          type="number" 
                          min={1}
                          value={currentExercise.sets} 
                          onChange={(e) => setCurrentExercise({...currentExercise, sets: parseInt(e.target.value) || 1})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reps">Repetições</Label>
                        <Input 
                          id="reps" 
                          type="number" 
                          min={1}
                          value={currentExercise.repsPerSet} 
                          onChange={(e) => setCurrentExercise({...currentExercise, repsPerSet: parseInt(e.target.value) || 1})} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Peso (kg) (opcional)</Label>
                      <Input 
                        id="weight" 
                        type="number" 
                        min={0}
                        step={0.5}
                        value={currentExercise.weight || ''} 
                        onChange={(e) => setCurrentExercise({...currentExercise, weight: parseFloat(e.target.value) || undefined})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rest">Descanso (segundos) (opcional)</Label>
                      <Input 
                        id="rest" 
                        type="number" 
                        min={0}
                        value={currentExercise.restTime || ''} 
                        onChange={(e) => setCurrentExercise({...currentExercise, restTime: parseInt(e.target.value) || undefined})} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações (opcional)</Label>
                    <Textarea 
                      id="notes" 
                      value={currentExercise.notes || ''} 
                      onChange={(e) => setCurrentExercise({...currentExercise, notes: e.target.value})} 
                      placeholder="Observações sobre o exercício"
                    />
                  </div>
                  
                  <Button type="button" onClick={handleAddExercise} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Exercício
                  </Button>
                </div>
                
                {workoutExercises.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-medium">Exercícios Adicionados:</h3>
                    <div className="space-y-2">
                      {workoutExercises.map((exercise, index) => {
                        const exerciseDetails = getExerciseById(exercise.exerciseId)
                        return (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                            <div>
                              <p className="font-medium">{exerciseDetails?.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {exercise.sets} séries × {exercise.repsPerSet} repetições
                                {exercise.weight ? ` @ ${exercise.weight}kg` : ''}
                                {exercise.restTime ? ` | ${exercise.restTime}s descanso` : ''}
                              </p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveExercise(index)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Atualizar Treino</Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </main>
    </div>
  )
}

export default function EditWorkoutPage() {
  return (
    <Suspense fallback={<Loading />}>
      <EditWorkout />
    </Suspense>
  )
}