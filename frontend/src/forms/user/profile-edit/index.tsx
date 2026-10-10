import { useUserProfileEditForm } from "@/forms/user/profile-edit/hook";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ComplexDialog } from "@/components/ui/complex-dialog";
import { useAuthStore } from "@/lib/zustand/use-auth";

export function UserProfileEditForm() {
  const { user } = useAuthStore();
  const { form, t, handleSubmit, isOpen, close, isBlurred, canSubmit, isSubmitting, isDirty } =
    useUserProfileEditForm();

  return (
    <ComplexDialog
      open={isOpen}
      onOpenChange={(open) => !open && close()}
      onConfirm={handleSubmit}
      isConfirmDisabled={!isBlurred || !canSubmit || isSubmitting || !isDirty}
      title={t("user.profile.title")}
      description={t("user.profile.description")}
      confirmText={t("general.actions.edit")}
    >
      <div className="flex justify-center">
        <Avatar className="size-20 rounded-2xl">
          <AvatarFallback
            name={user?.name}
            className="rounded-2xl bg-primary/10 text-2xl font-bold text-primary"
          />
        </Avatar>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <form.AppField name="name">
          {(field) => (
            <field.TextField
              label={t("user.fields.name.label")}
              placeholder={t("user.fields.name.placeholder")}
              type="text"
            />
          )}
        </form.AppField>

        <form.AppField name="email">
          {(field) => (
            <field.TextField
              className="h-12 text-base"
              label={t("user.fields.email.label")}
              placeholder={t("user.fields.email.placeholder")}
              type="email"
            />
          )}
        </form.AppField>
      </form>
    </ComplexDialog>
  );
}
