import { useMutation } from "@tanstack/react-query";

import type { LoginDto } from "@/modules/auth/dto/login.dto";
import type { ILoginService } from "@/modules/auth/services/contracts/login";
import { container } from "@/lib/inversifyJS/index.container";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";

export function useLoginMutation() {
  return useMutation({
    mutationFn: async (data: LoginDto) => {
      const loginService = container.get<ILoginService>(SERVICE_TOKENS.LoginService);

      await loginService.execute(data);
    },
  });
}
