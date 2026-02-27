import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>();

  async function onSubmit(data: LoginFormValues) {
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch {
      setError("root", {
        message: "Invalid email or password",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        inputId="email"
        label="Email"
        type="email"
        {...register("email", {
          required: "Email is required",
        })}
        error={errors.email?.message}
      />

      <Input
        inputId="password"
        label="Password"
        type="password"
        {...register("password", {
          required: "Password is required",
        })}
        error={errors.password?.message}
      />

      {errors.root && (
        <div className="text-center text-red-500 text-sm">
          {errors.root.message}
        </div>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
