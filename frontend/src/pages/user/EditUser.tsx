import { UserProfileEditForm } from "@/components/forms/user/profile-edit";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useAuthStore } from "@/lib/zustand/use-auth";
import { useTranslation } from "react-i18next";

export function EditUserPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  return (
    <div className="mx-auto w-full max-w-3xl py-10">
      <Card className="rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-6 p-8">
          <Avatar className="size-20 rounded-2xl">
            <AvatarFallback
              name={user?.name}
              className="rounded-2xl bg-primary/10 text-2xl font-bold text-primary"
            />
          </Avatar>

          <div className="space-y-2">
            <CardTitle className="text-3xl">{t("user.edit.title")}</CardTitle>

            <CardDescription className="text-base">{t("user.edit.description")}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-8 pt-2">
          <UserProfileEditForm />
        </CardContent>
      </Card>
    </div>
  );
}
