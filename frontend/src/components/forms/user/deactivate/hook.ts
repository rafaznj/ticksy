import { container } from "@/lib/inversifyJS/index.container";
import type { UserEntity } from "@/modules/user/entity/user.entity";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { useTranslation } from "react-i18next";
import { useDialog } from "@/contexts/use-dialog";
import type { IDeactivateUserService } from "@/modules/user/services/contracts/deactivate";
import { useDeactivateUser } from "@/modules/user/query-hooks/mutation/use-deactivate";

export function useDeactivateUserForm() {
  const { t } = useTranslation();

  const { isOpen, data: selectedUser, close } = useDialog<UserEntity>(DIALOG_KEYS.DEACTIVATE_USER);

  const deactivateUserService = container.get<IDeactivateUserService>(
    SERVICE_TOKENS.DeactivateUserService,
  );

  const { mutateAsync: deactivateUser, isPending: isSubmitting } =
    useDeactivateUser(deactivateUserService);

  const handleConfirm = async () => {
    if (!selectedUser?.id) return;

    await deactivateUser(selectedUser.id);
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
