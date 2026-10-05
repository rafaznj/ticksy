import { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";
import { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";
import { TicketCategoryEnum } from "@/modules/ticket/enums/category.enum";
import { UserRoleEnum } from "@/modules/user/enums/role.enum";

export const ticketStatusStyles: Record<TicketStatusEnum, string> = {
  [TicketStatusEnum.OPEN]:
    "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 rounded-xs",
  [TicketStatusEnum.IN_PROGRESS]:
    "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 rounded-xs",
  [TicketStatusEnum.RESOLVED]:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-xs",
};

export const ticketPriorityStyles: Record<TicketPriorityEnum, string> = {
  [TicketPriorityEnum.LOW]:
    "bg-slate-200 text-slate-800 dark:bg-slate-900 dark:text-slate-300 rounded-xs",
  [TicketPriorityEnum.MEDIUM]:
    "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 rounded-xs",
  [TicketPriorityEnum.HIGH]:
    "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 rounded-xs",
  [TicketPriorityEnum.URGENT]:
    "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 rounded-xs",
};

export const ticketCategoryStyles: Record<TicketCategoryEnum, string> = {
  [TicketCategoryEnum.ACCESS]:
    "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 rounded-xs",
  [TicketCategoryEnum.ACCOUNT]:
    "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 rounded-xs",
  [TicketCategoryEnum.HARDWARE]:
    "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 rounded-xs",
  [TicketCategoryEnum.SOFTWARE]:
    "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 rounded-xs",
  [TicketCategoryEnum.OTHER]:
    "bg-slate-200 text-slate-800 dark:bg-slate-900 dark:text-slate-300 rounded-xs",
};

export const userRoleStyles: Record<UserRoleEnum, string> = {
  [UserRoleEnum.ADMIN]:
    "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300 rounded-xs",
  [UserRoleEnum.EMPLOYEE]:
    "bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-300 rounded-xs",
  [UserRoleEnum.TECHNICAL_ASSISTANCE]:
    "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 rounded-xs",
};

export const userActiveStyles = {
  active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-xs",
  inactive: "bg-slate-200 text-slate-700 dark:bg-slate-900 dark:text-slate-300 rounded-xs",
};
