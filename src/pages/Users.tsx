import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import Header from "../components/Header";
import DashboardLayout from "../layouts/DashboardLayout";
import type { Doctor, User, UserRole } from "../models";
import { getApiErrorMessage } from "../services/api";
// import { createUser, deleteUser, getUsers } from "../services/auth.service";
import { getDoctors } from "../services/doctor.service";

type Form = { name: string; email: string; password: string; role: UserRole; doctorId?: number };

export default function Users() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const { register, handleSubmit, control, reset, formState: { isSubmitting } } = useForm<Form>({ defaultValues: { role: "DOCTOR" } });
  const role = useWatch({ control, name: "role" });
  const load = async () => {
    // try { const [accountData, doctorData] = await Promise.all([getUsers(), getDoctors()]); setUsers(accountData); setDoctors(doctorData); }
    // catch (error) { toast.error(getApiErrorMessage(error)); }
  };
  useEffect(() => {
    // Promise.all([getUsers(), getDoctors()])
    //   .then(([accountData, doctorData]) => {
    //     setUsers(accountData);
    //     setDoctors(doctorData);
    //   })
    //   .catch((error) => toast.error(getApiErrorMessage(error)));
  }, []);
  // if (user?.role !== "ADMIN") return <Navigate to="/" replace />;

  const submit = async (form: Form) => {
    // try { await createUser({ ...form, doctorId: form.role === "DOCTOR" ? form.doctorId : null }); toast.success("Account created"); reset({ role: "DOCTOR" }); await load(); }
    // catch (error) { toast.error(getApiErrorMessage(error, "Unable to create account")); }
  };
  const remove = async (id: number) => {
    if (!window.confirm("Delete this account?")) return;
    // try { await deleteUser(id); toast.success("Account deleted"); await load(); } catch (error) { toast.error(getApiErrorMessage(error)); }
  };

  return <DashboardLayout><Header />
    <div className="page-heading"><div><h1>User accounts</h1><p>Create secure admin, doctor, and laboratory logins.</p></div></div>
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6"><form className="grid gap-4 md:grid-cols-2 xl:grid-cols-5" onSubmit={handleSubmit(submit)}>
      <input className="form-input" placeholder="Full name" required {...register("name")} /><input className="form-input" type="email" placeholder="Email" required {...register("email")} /><input className="form-input" type="password" minLength={8} placeholder="Password" required {...register("password")} />
      <select className="form-input" {...register("role")}><option value="DOCTOR">Doctor</option><option value="LAB">Lab</option><option value="ADMIN">Admin</option></select>
      {role === "DOCTOR" ? <select className="form-input" required {...register("doctorId", { valueAsNumber: true })}><option value="">Doctor profile</option>{doctors.map((doctor) => <option key={doctor.id} value={doctor.id}>{doctor.name}</option>)}</select> : <button className="primary-button" disabled={isSubmitting}>Create account</button>}
      {role === "DOCTOR" && <button className="primary-button xl:col-start-5" disabled={isSubmitting}>Create account</button>}
    </form></div>
    <div className="table-card"><div className="overflow-x-auto"><table className="w-full"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th className="text-right">Actions</th></tr></thead><tbody>{users.map((account) => <tr key={account.id}><td>{account.name}</td><td>{account.email}</td><td>{account.role}</td><td className="text-right"><button className="icon-button text-red-600" disabled={account.id === user.id} onClick={() => void remove(account.id)}><Trash2 size={18} /></button></td></tr>)}</tbody></table></div></div>
  </DashboardLayout>;
}
