import { AdminMetrics } from "@/components/dashboard/AdminMetrics";
import { EmployeeMetrics } from "@/components/dashboard/EmployeeMetrics";
import { TechnicalAssistanceMetrics } from "@/components/dashboard/TechnicalAssistanceMetrics";
import { useAuthStore } from "@/lib/zustand/use-auth";
import { UserRoleEnum } from "@/modules/user/enums/role.enum";
import type { JSX } from "react/jsx-runtime";

const HOME_PAGE_BY_ROLE: Record<UserRoleEnum, () => JSX.Element> = {
  [UserRoleEnum.admin]: AdminMetrics,
  [UserRoleEnum.employee]: EmployeeMetrics,
  [UserRoleEnum.technical_assistance]: TechnicalAssistanceMetrics,
};

export default function HomePage() {
  const { user } = useAuthStore();
  const RoleHome = (user?.role && HOME_PAGE_BY_ROLE[user.role]) ?? EmployeeMetrics;

  return <RoleHome />;
}
