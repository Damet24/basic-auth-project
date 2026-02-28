import { zodResolver } from "@hookform/resolvers/zod";
import type { UpdateUserRequest } from "@packages/contracts/dtos/requests/UpdateUserRequest";
import { UpdateUserRequestSchema } from "@packages/contracts/dtos/requests/UpdateUserRequest";
import type { UserInfoResponse } from "@packages/contracts/dtos/responses/UserInfoResponse";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "../../hooks/useUser";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { useEffect } from "react";

export function EditUserForm({ user }: { user: UserInfoResponse }) {
  const { mutateAsync, isPending } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    setError,
  } = useForm<UpdateUserRequest>({
    resolver: zodResolver(UpdateUserRequestSchema),
  });

    useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        name: user.name,
        role: user.role
      });
    }
  }, [user, reset]);

  async function onSubmit(data: UpdateUserRequest) {
    try {
      const payload = Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== undefined && value !== "",
        ),
      ) as UpdateUserRequest;

      await mutateAsync({ id: user.id, payload });

      reset(payload);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        setError("root", { message: error.message });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        inputId="name"
        label="Name"
        type="text"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        inputId="email"
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Select
        selectId="role"
        label="Role"
        {...register("role")}
        error={errors.role?.message}
      >
        <option value="">Select role</option>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </Select>

      {errors.root && (
        <div className="text-center text-red-500 text-sm">
          {errors.root.message}
        </div>
      )}

      <Button type="submit" disabled={isPending || !isDirty} fullWidth>
        {isPending ? "Updating..." : "Save Changes"}
      </Button>
    </form>
  );
}
