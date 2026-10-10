import { container } from "@/lib/inversifyJS/index.container";
import type { UserDto } from "@/modules/user/dto/user.dto";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { useTranslation } from "react-i18next";
import { useDialog } from "@/hooks/use-dialog";
import type { IDeactivateUserService } from "@/modules/user/services/contracts/deactivate";
import { useDeactivateUser } from "@/modules/user/query-hooks/mutation/use-deactivate";

export function useDeactivateUserForm() {
  const { t } = useTranslation();

  const { isOpen, data: selectedUser, close } = useDialog<UserDto>(DIALOG_KEYS.DEACTIVATE_USER);

  const deactivateUserService = container.get<IDeactivateUserService>(
    SERVICE_TOKENS.DeactivateUserService,
  );

  const { mutateAsync: handleDeactivateUser, isPending: isSubmitting } =
    useDeactivateUser(deactivateUserService);

  const handleConfirm = async () => {
    if (!selectedUser?.id) return;

    await handleDeactivateUser(selectedUser.id);
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
