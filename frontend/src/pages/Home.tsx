import { AdminMetrics } from "@/components/AdminMetrics";
import { EmployeeMetrics } from "@/components/EmployeeMetrics";
import { TechnicalAssistanceMetrics } from "@/components/TechnicalAssistance";
import { useAuthStore } from "@/lib/zustand/use-auth";
import { UserRoleEnum } from "@/modules/user/enums/roles.enum";
import type { JSX } from "react/jsx-runtime";

const HOME_PAGE_BY_ROLE: Record<UserRoleEnum, () => JSX.Element> = {
  [UserRoleEnum.ADMIN]: AdminMetrics,
  [UserRoleEnum.EMPLOYEE]: EmployeeMetrics,
  [UserRoleEnum.TECHNICAL_ASSISTANCE]: TechnicalAssistanceMetrics,
};

export default function HomePage() {
  const { user } = useAuthStore();
  const RoleHome = (user?.role && HOME_PAGE_BY_ROLE[user.role]) ?? EmployeeMetrics;

  return <RoleHome />;
}
