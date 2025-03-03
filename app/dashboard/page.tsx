"use client"

import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { progressData, exercises, getMuscleGroupName } from "@/lib/data"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DashboardPage() {
  const [selectedExercise, setSelectedExercise] = useState(progressData[0].exercise)
  
  const exerciseData = progressData.find(p => p.exercise === selectedExercise)?.data || []
  
  // Calculate total volume by muscle group
  const volumeByMuscleGroup = progressData.reduce((acc, curr) => {
    const muscleGroup = getMuscleGroupName(curr.muscleGroup)
    const totalVolume = curr.data.reduce((sum, d) => sum + d.volume, 0)
    
    if (!acc[muscleGroup]) {
      acc[muscleGroup] = 0
    }
    
    acc[muscleGroup] += totalVolume
    
    return acc
  }, {} as Record<string, number>)
  
  const muscleGroupData = Object.entries(volumeByMuscleGroup).map(([name, volume]) => ({
    name,
    volume
  }))
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        
        <Tabs defaultValue="progress" className="space-y-4">
          <TabsList>
            <TabsTrigger value="progress">Progresso</TabsTrigger>
            <TabsTrigger value="volume">Volume por Grupo Muscular</TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Progresso de Peso</CardTitle>
                    <CardDescription>
                      Acompanhe a evolução do peso utilizado nos exercícios
                    </CardDescription>
                  </div>
                  <Select
                    value={selectedExercise}
                    onValueChange={setSelectedExercise}
                  >
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Selecione um exercício" />
                    </SelectTrigger>
                    <SelectContent>
                      {progressData.map((data) => (
                        <SelectItem key={data.exercise} value={data.exercise}>
                          {data.exercise}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="h-[300px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={exerciseData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      name="Peso (kg)" 
                      stroke="hsl(var(--chart-1))" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="reps" 
                      name="Repetições" 
                      stroke="hsl(var(--chart-2))" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="volume" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Volume por Grupo Muscular</CardTitle>
                <CardDescription>
                  Volume total de treino por grupo muscular (peso × repetições × séries)
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={muscleGroupData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="volume" 
                      name="Volume Total" 
                      fill="hsl(var(--chart-3))" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}