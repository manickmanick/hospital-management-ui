import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../auth/auth-context";
import AuthLayout from "../layouts/AuthLayout";
import type { RegisterInput } from "../models";
import { getApiErrorMessage } from "../services/api";

type RegisterForm = RegisterInput & { confirmPassword: string };

export default function Register() {
  const { register: createAccount, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

  if (isAuthenticated) return <Navigate to="/" replace />;

  const onSubmit = async (form: RegisterForm) => {
    const input: RegisterInput = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    try {
      await createAccount(input);
      toast.success("Account created successfully");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to create account"));
    }
  };

  return (
    <AuthLayout>
      <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-9">
        <h1 className="text-3xl font-bold text-slate-900">Create account</h1>
        <p className="mt-2 text-slate-500">
          Register a hospital administrator account.
        </p>

        <form className="mt-7 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full name
            </label>
            <input
              className="form-input"
              autoComplete="name"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Enter your full name" },
              })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email address
            </label>
            <input
              type="email"
              className="form-input"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                type="password"
                className="form-input"
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Use at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Confirm
              </label>
              <input
                type="password"
                className="form-input"
                autoComplete="new-password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="primary-button mt-2 w-full"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link className="font-semibold text-blue-600" to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
