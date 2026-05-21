export interface Athlete {
  id: string;
  name: string;
  email: string;
  phone?: string;
  level: "beginner" | "intermediate" | "advanced";
  createdAt: Date;
}

export interface TrainingPlan {
  id: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  includes: string[];
}

export interface Session {
  id: string;
  title: string;
  date: Date;
  duration: number;
  location: string;
  maxParticipants: number;
  enrolled: number;
}
