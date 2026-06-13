export type UserRole = "ADMIN" | "DOCTOR" | "LAB";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  doctorId: number | null;
  isActive?: boolean;
  createdAt?: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type Patient = {
  id: number;
  name: string;
  dateOfBirth?: string | null;
  age?: number | null;
  gender?: "MALE" | "FEMALE" | "OTHER" | null;
  phone: string;
  email?: string | null;
  address?: string | null;
  bloodGroup?: string | null;
  allergies?: string | null;
  emergencyContact?: string | null;
  createdAt?: string;
};

export type PatientInput = Omit<Patient, "id" | "createdAt">;

export type Doctor = {
  id: number;
  name: string;
  specialization: string;
  licenseNumber: string;
  phone: string;
  email: string;
  createdAt?: string;
};

export type DoctorInput = Omit<Doctor, "id" | "createdAt">;

export type AppointmentStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED";

export type Appointment = {
  id: number;
  patientId: number;
  doctorId: number;
  patientName: string;
  doctorName: string;
  specialization?: string;
  appointmentDate: string;
  status: AppointmentStatus;
  reason?: string | null;
};

export type AppointmentInput = {
  patientId: number;
  doctorId: number;
  appointmentDate: string;
  reason?: string | null;
};

export type PrescriptionMedicine = {
  id?: number;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string | null;
};

export type Prescription = {
  id: number;
  appointmentId: number;
  diagnosis: string;
  notes?: string | null;
  prescribedAt: string;
  doctorId: number;
  doctorName: string;
  medicines: PrescriptionMedicine[];
};

export type LabReport = {
  id: number;
  testName: string;
  notes?: string | null;
  storageType: "LOCAL" | "S3";
  originalFileName: string;
  mimeType: string;
  uploadedAt: string;
  fileUrl: string;
};

export type PatientHistory = {
  patient: Patient;
  appointments: Appointment[];
  prescriptions: Prescription[];
  labReports: LabReport[];
};

export type DashboardSummary = {
  patients: number;
  doctors: number;
  appointments: number;
  completedAppointments: number;
  recentAppointments: Appointment[];
};
