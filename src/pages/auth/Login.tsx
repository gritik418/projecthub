import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Logo from "../../components/Logo/Logo";
import { useForm } from "react-hook-form";
import type { LoginDto } from "../../schemas/auth/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginSchema from "../../schemas/auth/login.schema";
import { useLoginMutation } from "../../features/auth/auth.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { saveToken } from "../../features/auth/auth.slice";

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (data: LoginDto) => {
    try {
      const result = await login(data).unwrap();

      if (!result.data.accessToken) {
        toast.error("Something went wrong.");
      } else {
        dispatch(saveToken({ accessToken: result.data.accessToken }));
        toast.success(result.message || "Logged in successfully.");

        navigate("/");
      }
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error(
          "Unable to connect to the server. Please make sure the server is running.",
        );
        return;
      }

      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  return (
    <main className="min-h-screen bg-[#070B16] text-white flex overflow-hidden">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[140px]" />
      </div>

      <section className="hidden lg:flex relative w-1/2 flex-col justify-between border-r border-white/5 px-16 py-12">
        <div>
          <Logo />

          <div className="mt-32 max-w-lg">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-indigo-400">
              Project management
            </p>

            <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight">
              Keep your projects
              <span className="text-indigo-400"> moving forward.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
              Manage projects, track tasks, collaborate with your team, and stay
              updated with activity in real time.
            </p>
          </div>
        </div>

        <div className="grid max-w-lg grid-cols-3 gap-8 border-t border-white/5 pt-8">
          <div>
            <p className="text-2xl font-semibold">Real-time</p>
            <p className="mt-1 text-sm text-slate-500">Activity updates</p>
          </div>

          <div>
            <p className="text-2xl font-semibold">RBAC</p>
            <p className="mt-1 text-sm text-slate-500">Role-based access</p>
          </div>

          <div>
            <p className="text-2xl font-semibold">Secure</p>
            <p className="mt-1 text-sm text-slate-500">JWT authentication</p>
          </div>
        </div>
      </section>

      <section className="relative flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <p className="mb-3 text-3xl font-semibold text-indigo-400">
              Welcome back!
            </p>

            <h2 className="text-3xl font-semibold tracking-tight">
              Sign in to ProjectHub
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Enter your credentials to access your account.
            </p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-white/8 bg-black/20 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500/60 focus:bg-indigo-500/[0.03] focus:ring-2 focus:ring-indigo-500/10"
                    required
                  />
                </div>

                {errors.email ? (
                  <span className="text-xs text-red-500">
                    {errors.email.message}
                  </span>
                ) : null}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-300"
                  >
                    Password
                  </label>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-xl border border-white/8 bg-black/20 pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500/60 focus:bg-indigo-500/[0.03] focus:ring-2 focus:ring-indigo-500/10"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password ? (
                  <span className="text-xs text-red-500">
                    {errors.password.message}
                  </span>
                ) : null}
              </div>

              <button
                type="submit"
                className="group cursor-pointer flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 hover:shadow-indigo-600/30 active:scale-[0.99]"
              >
                Sign in
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-400 transition hover:text-indigo-300"
            >
              Register
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
