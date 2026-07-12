import { useMutation } from "@tanstack/react-query";

import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import type { IAuthService } from "@/modules/auth/services/contracts/auth";
import { container } from "@/lib/inversifyJS/index.container";

interface LoginParams {
  email: string;
  password: string;
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: async ({ email, password }: LoginParams) => {
      const authService = container.get<IAuthService>(SERVICE_TOKENS.AuthService);
      await authService.login(email, password);
    },
  });
}
