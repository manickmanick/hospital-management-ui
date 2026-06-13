export type UserRole = "admin" | "doctor" | "receptionist";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = LoginInput & {
  name: string;
};

export type Patient = {
  id: number;
  name: string;
  age: number;
  phone: string;
  gender?: string;
  address?: string;
  createdAt?: string;
};

export type PatientInput = Pick<Patient, "name" | "age" | "phone">;

export type Doctor = {
  id: number;
  name: string;
  specialization: string;
  phone: string;
  email?: string;
  status?: "Available" | "Unavailable";
};

export type DoctorInput = Omit<Doctor, "id">;

export type AppointmentStatus =
  | "Scheduled"
  | "Completed"
  | "Cancelled";

export type Appointment = {
  id: number;
  patientId?: number;
  doctorId?: number;
  patient: string;
  doctor: string;
  date: string;
  time?: string;
  status: AppointmentStatus;
  reason?: string;
};

export type AppointmentInput = {
  patientId: number;
  doctorId: number;
  date: string;
  time: string;
  reason?: string;
  status?: AppointmentStatus;
};

export type DashboardSummary = {
  patients: number;
  doctors: number;
  appointments: number;
  revenue: number;
  recentAppointments: Appointment[];
};
