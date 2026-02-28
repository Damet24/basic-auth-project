import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ChangePasswordRequest,
  ChangePasswordSchema,
} from "@packages/contracts/dtos/requests/ChangePasswordRequest";
import { useForm } from "react-hook-form";
import { useChangePassword } from "../../hooks/useAuth";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

type Props = {
  onCancel?: () => void;
  onSuccess?: () => void;
};

export function ChangePasswordForm({ onCancel, onSuccess }: Props) {
  const { mutateAsync, isPending } = useChangePassword();

  const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isDirty, isValid },
  setError,
} = useForm<ChangePasswordRequest>({
  resolver: zodResolver(ChangePasswordSchema),
  mode: 'onChange',
  defaultValues: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
})

  async function onSubmit(data: ChangePasswordRequest) {
    try {
      await mutateAsync(data);
      reset();
      onSuccess?.();
    } catch (error) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} 
    className="space-y-4 rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
      <Input
        inputId="currentPassword"
        label="Current Password"
        type="password"
        {...register("currentPassword")}
        error={errors.currentPassword?.message}
      />

      <Input
        inputId="newPassword"
        label="New Password"
        type="password"
        {...register("newPassword")}
        error={errors.newPassword?.message}
      />

      <Input
        inputId="confirmPassword"
        label="Confirm Password"
        type="password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      {errors.root && (
        <div className="text-center text-red-500 text-sm">
          {errors.root.message}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} fullWidth>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending || !isDirty || !isValid} fullWidth>
          {isPending ? "Updating..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
