import { container } from "@/lib/inversifyJS/index.container";
import type { UserDto } from "@/modules/user/dto/user.dto";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { useTranslation } from "react-i18next";
import { useDialog } from "@/hooks/use-dialog";
import type { IActivateUserService } from "@/modules/user/services/contracts/activate";
import { useActivateUser } from "@/modules/user/query-hooks/mutation/use-activate";

export function useActivateUserForm() {
  const { t } = useTranslation();

  const { isOpen, data: selectedUser, close } = useDialog<UserDto>(DIALOG_KEYS.ACTIVATE_USER);

  const activateUserService = container.get<IActivateUserService>(
    SERVICE_TOKENS.ActivateUserService,
  );

  const { mutateAsync: handleActivateUser, isPending: isSubmitting } =
    useActivateUser(activateUserService);

  const handleConfirm = async () => {
    if (!selectedUser?.id) return;

    await handleActivateUser(selectedUser.id);
    close();
  };

  return {
    t,
    isOpen,
    selectedUser,
    isSubmitting,
    close,
    handleConfirm,
  };
}
