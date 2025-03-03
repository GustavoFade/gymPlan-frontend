// Types
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'trainer' | 'student';
  avatar?: string;
};

export type Exercise = {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  description?: string;
};

export type MuscleGroup = 
  | 'chest' 
  | 'back' 
  | 'legs' 
  | 'shoulders' 
  | 'arms' 
  | 'core' 
  | 'cardio';

export type WorkoutPlan = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  exercises: WorkoutExercise[];
};

export type WorkoutExercise = {
  id: string;
  exerciseId: string;
  sets: number;
  repsPerSet: number;
  weight?: number;
  restTime?: number; // in seconds
  notes?: string;
};

export type WorkoutSession = {
  id: string;
  studentId: string;
  workoutPlanId: string;
  date: string;
  completed: boolean;
  exercises: CompletedExercise[];
};

export type CompletedExercise = {
  id: string;
  exerciseId: string;
  sets: CompletedSet[];
};

export type CompletedSet = {
  id: string;
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
};

export type ProgressData = {
  exercise: string;
  muscleGroup: MuscleGroup;
  data: {
    date: string;
    weight: number;
    reps: number;
    volume: number; // weight * reps * sets
  }[];
};

// Mock Data
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'João Silva',
    email: 'joao@example.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    email: 'maria@example.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
  },
];

export const exercises: Exercise[] = [
  { id: '1', name: 'Supino Reto', muscleGroup: 'chest', description: 'Exercício para peitoral' },
  { id: '2', name: 'Agachamento', muscleGroup: 'legs', description: 'Exercício para quadríceps' },
  { id: '3', name: 'Puxada Frontal', muscleGroup: 'back', description: 'Exercício para costas' },
  { id: '4', name: 'Desenvolvimento', muscleGroup: 'shoulders', description: 'Exercício para ombros' },
  { id: '5', name: 'Rosca Direta', muscleGroup: 'arms', description: 'Exercício para bíceps' },
  { id: '6', name: 'Tríceps Corda', muscleGroup: 'arms', description: 'Exercício para tríceps' },
  { id: '7', name: 'Leg Press', muscleGroup: 'legs', description: 'Exercício para pernas' },
  { id: '8', name: 'Abdominal', muscleGroup: 'core', description: 'Exercício para abdômen' },
  { id: '9', name: 'Esteira', muscleGroup: 'cardio', description: 'Exercício cardiovascular' },
];

export const workoutPlans: WorkoutPlan[] = [
  {
    id: '1',
    name: 'Treino A - Peito e Tríceps',
    description: 'Foco em peito e tríceps',
    createdAt: '2023-01-01T10:00:00Z',
    updatedAt: '2023-01-01T10:00:00Z',
    exercises: [
      { id: '1', exerciseId: '1', sets: 4, repsPerSet: 12, weight: 60, restTime: 60 },
      { id: '2', exerciseId: '6', sets: 3, repsPerSet: 15, weight: 30, restTime: 45 },
    ],
  },
  {
    id: '2',
    name: 'Treino B - Costas e Bíceps',
    description: 'Foco em costas e bíceps',
    createdAt: '2023-01-02T10:00:00Z',
    updatedAt: '2023-01-02T10:00:00Z',
    exercises: [
      { id: '1', exerciseId: '3', sets: 4, repsPerSet: 10, weight: 70, restTime: 60 },
      { id: '2', exerciseId: '5', sets: 3, repsPerSet: 12, weight: 25, restTime: 45 },
    ],
  },
  {
    id: '3',
    name: 'Treino C - Pernas',
    description: 'Foco em pernas',
    createdAt: '2023-01-03T10:00:00Z',
    updatedAt: '2023-01-03T10:00:00Z',
    exercises: [
      { id: '1', exerciseId: '2', sets: 4, repsPerSet: 10, weight: 100, restTime: 90 },
      { id: '2', exerciseId: '7', sets: 3, repsPerSet: 12, weight: 150, restTime: 60 },
    ],
  },
];

export const workoutSessions: WorkoutSession[] = [
  {
    id: '1',
    studentId: '2',
    workoutPlanId: '1',
    date: '2023-01-10T10:00:00Z',
    completed: true,
    exercises: [
      {
        id: '1',
        exerciseId: '1',
        sets: [
          { id: '1', setNumber: 1, reps: 12, weight: 60, completed: true },
          { id: '2', setNumber: 2, reps: 12, weight: 60, completed: true },
          { id: '3', setNumber: 3, reps: 10, weight: 60, completed: true },
          { id: '4', setNumber: 4, reps: 8, weight: 60, completed: true },
        ],
      },
      {
        id: '2',
        exerciseId: '6',
        sets: [
          { id: '1', setNumber: 1, reps: 15, weight: 30, completed: true },
          { id: '2', setNumber: 2, reps: 15, weight: 30, completed: true },
          { id: '3', setNumber: 3, reps: 12, weight: 30, completed: true },
        ],
      },
    ],
  },
  {
    id: '2',
    studentId: '2',
    workoutPlanId: '1',
    date: '2023-01-17T10:00:00Z',
    completed: true,
    exercises: [
      {
        id: '1',
        exerciseId: '1',
        sets: [
          { id: '1', setNumber: 1, reps: 12, weight: 65, completed: true },
          { id: '2', setNumber: 2, reps: 12, weight: 65, completed: true },
          { id: '3', setNumber: 3, reps: 10, weight: 65, completed: true },
          { id: '4', setNumber: 4, reps: 8, weight: 65, completed: true },
        ],
      },
      {
        id: '2',
        exerciseId: '6',
        sets: [
          { id: '1', setNumber: 1, reps: 15, weight: 35, completed: true },
          { id: '2', setNumber: 2, reps: 15, weight: 35, completed: true },
          { id: '3', setNumber: 3, reps: 12, weight: 35, completed: true },
        ],
      },
    ],
  },
  {
    id: '3',
    studentId: '2',
    workoutPlanId: '1',
    date: '2023-01-24T10:00:00Z',
    completed: true,
    exercises: [
      {
        id: '1',
        exerciseId: '1',
        sets: [
          { id: '1', setNumber: 1, reps: 12, weight: 70, completed: true },
          { id: '2', setNumber: 2, reps: 12, weight: 70, completed: true },
          { id: '3', setNumber: 3, reps: 10, weight: 70, completed: true },
          { id: '4', setNumber: 4, reps: 8, weight: 70, completed: true },
        ],
      },
      {
        id: '2',
        exerciseId: '6',
        sets: [
          { id: '1', setNumber: 1, reps: 15, weight: 40, completed: true },
          { id: '2', setNumber: 2, reps: 15, weight: 40, completed: true },
          { id: '3', setNumber: 3, reps: 12, weight: 40, completed: true },
        ],
      },
    ],
  },
];

export const progressData: ProgressData[] = [
  {
    exercise: 'Supino Reto',
    muscleGroup: 'chest',
    data: [
      { date: '2023-01-10', weight: 60, reps: 12, volume: 2880 },
      { date: '2023-01-17', weight: 65, reps: 12, volume: 3120 },
      { date: '2023-01-24', weight: 70, reps: 12, volume: 3360 },
      { date: '2023-01-31', weight: 75, reps: 10, volume: 3000 },
      { date: '2023-02-07', weight: 80, reps: 8, volume: 2560 },
      { date: '2023-02-14', weight: 80, reps: 10, volume: 3200 },
    ],
  },
  {
    exercise: 'Agachamento',
    muscleGroup: 'legs',
    data: [
      { date: '2023-01-12', weight: 100, reps: 10, volume: 4000 },
      { date: '2023-01-19', weight: 110, reps: 10, volume: 4400 },
      { date: '2023-01-26', weight: 120, reps: 8, volume: 3840 },
      { date: '2023-02-02', weight: 120, reps: 10, volume: 4800 },
      { date: '2023-02-09', weight: 130, reps: 8, volume: 4160 },
      { date: '2023-02-16', weight: 130, reps: 10, volume: 5200 },
    ],
  },
  {
    exercise: 'Puxada Frontal',
    muscleGroup: 'back',
    data: [
      { date: '2023-01-11', weight: 70, reps: 10, volume: 2800 },
      { date: '2023-01-18', weight: 75, reps: 10, volume: 3000 },
      { date: '2023-01-25', weight: 80, reps: 8, volume: 2560 },
      { date: '2023-02-01', weight: 80, reps: 10, volume: 3200 },
      { date: '2023-02-08', weight: 85, reps: 8, volume: 2720 },
      { date: '2023-02-15', weight: 85, reps: 10, volume: 3400 },
    ],
  },
];

// Helper functions
export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find(exercise => exercise.id === id);
}

export function getWorkoutPlanById(id: string): WorkoutPlan | undefined {
  return workoutPlans.find(plan => plan.id === id);
}

export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

export function getWorkoutSessionsByStudentId(studentId: string): WorkoutSession[] {
  return workoutSessions.filter(session => session.studentId === studentId);
}

export function getMuscleGroupName(muscleGroup: MuscleGroup): string {
  const names = {
    chest: 'Peito',
    back: 'Costas',
    legs: 'Pernas',
    shoulders: 'Ombros',
    arms: 'Braços',
    core: 'Core',
    cardio: 'Cardio'
  };
  return names[muscleGroup];
}