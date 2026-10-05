import { useMutation } from "@tanstack/react-query";
import type { CreateUserDto } from "../../dto/create.dto";
import type { ICreateUserService } from "@/modules/user/services/contracts/create";
import { handleMutationError } from "@/shared/errors/handle-mutation-error";
import { useTranslation } from "react-i18next";
import handleMutationResponse from "@/shared/response/handle-mutation-response";
import queryClient from "@/lib/tanstack/query-client";
import { toast } from "sonner";
import { TANSTACK_QUERY_KEYS } from "@/lib/tanstack/query-keys";

export function useCreateUser(createUserService: ICreateUserService) {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: async (data: CreateUserDto) => {
      const response = await createUserService.execute(data);

      return handleMutationResponse(response);
    },
    onSuccess: () => {
      toast.success(t("user.messages.created"));

      queryClient.invalidateQueries({ queryKey: [TANSTACK_QUERY_KEYS.GET_USER_PAGED] });
    },
    onError: handleMutationError(t("user.messages.errors.createFailed")),
  });
}
